export declare class Seed {
    private _seed;
    private _seeder;
    private generateRange;
    private generateSeeder;
    set seed(seed: string);
    get seed(): string;
    constructor(seed?: string);
    random(min?: number, max?: number): number;
    randomInt(min?: number, max?: number): number;
    sfc32(min?: number, max?: number): number;
    mulberry32(min?: number, max?: number): number;
    jsf32(min?: number, max?: number): number;
    xoshiro128(min?: number, max?: number): number;
}
