---
sidebar_position: 1
---

# 📚 原理

OOMOL 的工作流引擎称为 OOCANA，它是整个 OOMOL Studio 运行的基础。

## OOCANA 介绍

oocana 是对一系列任务单元进行编排与运行的调度工具。其调度逻辑存储在 flow.oo.yaml 中，而运行任务所需要的内容，则存储在 block.oo.yaml 文件中。前者在下文简称为 flow，后者简称为 block。block.oo.yaml 中会有一个内容用来标识运行 block 所需要的源码文件，我们称之为 block 函数。

block 函数，可以是 nodejs、python 语言编写的脚本。这个函数需要是固定的名称（main）。这个函数接受两个参数，第一个参数是输入数据，第二个参数则是block 运行时提供的辅助函数。在编写 block 函数时，我们可以通过第一个参数获取到输入数据。这个函数可以直接返回一个字典对象（在 nodejs 中可以是一个最终返回字典的 promise ），这个字典对象就是 block 的输出数据。

flow 文件用来描述 block 之间的运行触发顺序以及数据传递的关系。

## block 的编排与运行

block 的触发顺序由 flow 中的连线决定，当 block 所需要的数据准备好时，block 就会被触发执行，我们称之为数据流驱动。与之相对的还有 github action 中 steps 的触发方式————上一个 step 完成后，下一个 step 才会被触发，这种事件驱动的方式多用于编译、打包等 CI/CD 场景。

目前 block 的运行环境有 nodejs 和 python，当前相同语言的 block 之间运行在同一个环境中。不同语言环境的 block 数据传递则是通过 json 传递，同一个语言环境中的 block 之间除了使用 json 传递外，还可以直接传递变量。对于变量需要注意的是，变量的传递是通过引用传递的，所以在 block 中修改变量的值会影响到其他 block 中的这个变量。

### block 的数据传递

block 和 flow 中都会分别定义数据的格式，oocana 目前不会对这些数据格式进行检查（GUI 图形界面部分组件，会执行这部分检查）。而实际运行过程中暂时不会对 block 实际返回的数据格式进行检查，所以在编写 block 函数时，需要保证返回的数据格式符合 flow 和 block 定义的数据格式。

### block 的调试与加速

当 flow 中的 block 较多，每次运行耗时较长，我们可以通过指定运行 block 的方式来加快调试速度。同时制定运行 block 有两种加速方式：

1. 运行到指定 block 后，就结束这次运行
2. 使用之前运行的数据缓存（只支持 json 数据），来跳过一些可以不运行的 block，尽快运行到指定 block 中。