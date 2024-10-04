import { name } from "../application/name";
class User {
    constructor(private name: string) {
    }

    getName(): string {
        return name;
    }
}
