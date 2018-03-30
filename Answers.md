# Sprint Challenge Computer Arch I Problem Solutions and Answers

## Binary, Decimal, and Hex

Complete the following problems:

* Convert `11001111` binary

    to hex: CF

    to decimal: 207


* Convert `4C` hex

    to binary: 0b01001100

    to decimal: 76


* Convert `68` decimal

    to binary: 0b01000100

    to hex: 0x44


## Architecture

One paragraph-ish:

### Explain how the CPU provides concurrency:

* By utilizing individual process stacks, the CPU can permit other CPU threads to execute simultaneously without affecting each other. Each thread executes on its own stack. However, not all instructions can be executed concurrently. For example, loading things into memory can be done concurrently. But, performing mathematical calculations based on the values those memory locations hold cannot be done concurrently. This is because each calculation essentially depends on the previous one being finished. The CPU also uses the stack for allowing the user to simultaneously interrupt the processes and input new instructions. This is handled through the Interrupt Requests sent from IO modules like the keyboard and mouse. After the user is finished with the instruction, the CPU picks up where it left off by re-loading from stack the CPU state it was on when it was interrupted.

### Describe assembly language and machine language:

* Assembly language is formatted as op code and register flags that allows for more human readability. This language uses a mnemonic method to represent the instructions and op codes. The code written in this language is then interpreted by an assembler program that converts it into executable machine language code.

* Machine Language is code and instructions designed to be executed directly by the CPU. It is the lowest level of programming language. Machine language is represented in 1s and 0s, and it is binary in nature, but each processor type and manufacturer uses its own set of instructions.

### Suggest the role that graphics cards play in machine learning:

* A GPU can handle multiple parallel instructions at once much more than a CPU can, and this is what the GPU is optimized for. Because of this and the nature of machine learning, it requires multiple matrix multiplications and other operations can be computed in parallel, a CPU with 12 or 18 cores can process one of those operations very quickly, and the GPU with thousands of slower cores at its disposal. The GPU's fast memory access still beats the CPU.