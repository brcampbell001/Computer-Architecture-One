const fs = require('fs');

/**
 * LS-8 v2.0 emulator skeleton code
 */
const IM = 0x05;
const IS = 0x06;
const SP = 0x07;

const HLT = 0b00000001;
const LDI = 0b10011001;
const PRN = 0b01000011;
const MUL = 0b10101010;

const POP = 0b01001100;
const PUSH = 0b01001101;

const CALL = 0b01001000;
const RET = 0b00001001;

const CMP = 0b10100000;

/**** FLAGS *****/

const FL_EQ = 0;
const FL_GT = 1;
const FL_LT = 2;

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
    this.reg.IR = 0; // Instruction Register
    this.reg.FL = 0; // Flags

    this.reg[IM] = 0;
    this.reg[IS] = 0;
    this.reg[SP] = 0xF4;

    this.setupBranchTable();
  }

  poke(address, value) {
    this.ram.write(address, value);
  }

  startClock() {
    const _this = this;

    this.clock = setInterval(() => {
      _this.tick();
    }, 1);
  }

  stopClock() {
    clearInterval(this.clock);
  }

  setFlag(flag, value) {
    value = +value;

    if (value) {
      this.reg.FL |= (1 << flag);
    } else {
      this.reg.FL &= (~(1 << flag));
    }
  }

  getFlag(flag) {
    return (this.reg.FL & (1 << flag)) >> flag;
  }

  alu(op, regA, regB) {
    let varA = this.reg[regA];
    let varB = this.reg[regB];
    switch (op) {
      case 'MUL':
        this.reg[regA] = (this.reg[regA] * this.reg[regB]) & 255;
        break;
      case 'INC':
        this.reg[regA] = (this.reg[regA] + 1) & 255;
        break;
      case 'DEC':
        this.reg[regA] = (this.reg[regA] - 1) & 255;
        break;
      case 'CMP':
        this.setFlag(FL_EQ, this.reg[regA] === this.reg[regB]);
        this.setFlag(FL_GT, this.reg[regA] > this.reg[regB]);
        this.setFlag(FL_LT, this.reg[regA] < this.reg[regB]);
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    let IR = this.ram.read(this.reg.PC);

    const handler = this.branchTable[this.reg.IR];

    if (handler === undefined) {
      console.log(`Instruction ${this.reg.IR} is not valid`);
      this.stopClock();
      return;
    }

    let operandA = this.ram.read(this.reg.PC + 1);
    let operandB = this.ram.read(this.reg.PC + 2);

    const newPC = handler.call(this, operandA, operandB);

    const count = (this.reg.IR >> 6) & 0b00000011;
    this.reg.PC += (count + 1);
  }

  HLT() {
    this.stopClock();
  }

  LDI(reg, value) {
    this.reg[reg] = value;
  }

  PRN(reg) {
    const value = this.reg[reg];
    console.log(value);
  }

  MUL(regA, regB) {
    this.alu('MUL', regA, regB);
  }

  INC(reg) {
    this.alu('INC', reg);
  }

  DEC(reg) {
    this.alu('DEC', reg);
  }

  _push(value) {
    this.alu('DEC', SP);
    this.ram.write(this.reg[SP], value);
  }

  PUSH(reg) {
    this._push(this.reg[reg]);
  }

  _pop() {
    const value = this.ram.read(this.reg[SP]);
    this.alu('INC', SP);
    return value;
  }

  POP(reg) {
    this.reg[reg] = this._pop();
  }

  CALL(reg) {
    this._push(this.reg.PC + 2);
    const addr = this.reg[reg];
    return addr;
  }

  RET() {
    const value = this._pop();
    return value
  }

  CMP(regA, regB) {
    this.alu('CMP', regA, regB);
  }
}

setupBranchTable = () => {
  let bt = {};

  bt[HLT] = this.HLT;

  bt[LDI] = this.LDI;
  bt[PRN] = this.PRN;

  bt[MUL] = this.MUL;

  bt[INC] = this.INC;
  bt[DEC] = this.DEC;

  bt[PUSH] = this.PUSH;
  bt[POP] = this.POP;

  bt[CALL] = this.CALL;
  bt[RET] = this.RET;

  bt[CMP] = this.CMP;

  this.branchTable = bt;
}

if (Object.keys(branchTable).includes(IR.toString())) {
  branchTable[IR](operandA, operandB);
} else {
  handle_ERROR(IR);
}

module.exports = CPU;