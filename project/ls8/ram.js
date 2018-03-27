/**
 * RAM access
 */
class RAM {
    constructor(size) {
        this.mem = new Array(size);
        this.mem.fill(0);
    }

    /**
     * Write (store) MDR value at address MAR
     */
    write(MAR, MDR) {
        this.mem[MAR] = MDR;
        // return this.access(MAR, MDR, 'write');
    }

    /**
     * Read (load) MDR value from address MAR
     * 
     * @returns MDR
     */
    read(MAR) {
        // !!! IMPLEMENT ME
        // Read the value in address MAR and return it
        return this.mem
    }

    //     access(MAR, MDR, action) {
    //         if (action === 'write') {
    //             this.mem[MAR] = MDR;
    //         }
    //         if (action === 'read') {
    //             MDR = this.mem[MAR];
    //         }
    //         return MDR;
    //     };
};

module.exports = RAM;