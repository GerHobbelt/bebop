import { BebopView } from 'bebop';
import { it, expect } from 'vitest';
import { U, WeirdOrder } from './generated/gen';

it("Union roundtrip", () => {
    const obj = U.fromA({ b: 12345 });
    const bytes = U.encode(obj);
    const obj2 = U.decode(bytes);
    expect(JSON.stringify(obj)).toEqual(JSON.stringify(obj2)); 
});

it("Union weird discriminator order roundtrip", () => {
    const obj = WeirdOrder.fromTwoComesFirst({ b: 99 });
    const bytes = WeirdOrder.encode(obj);
    const obj2 = WeirdOrder.decode(bytes);
    expect(JSON.stringify(obj)).toEqual(JSON.stringify(obj2));
});

