declare function getGlobalName(id: number | string): void

// declare function jQuery(selector: string): any;

declare function render(callback?: () => void): string

declare const jQuery: (selector: string) => any

declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}

declare namespace Jye {
    interface Info {
        name: string;
        age: string;
    }

    function getAge(): number;
}

declare namespace Jye.Eee {
    interface Api {
        getInfo(): Info;
    }
}
