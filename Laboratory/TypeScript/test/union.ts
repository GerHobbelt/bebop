import { BebopView } from 'bebop';
import { U, WeirdOrder } from './generated/gen';
if (typeof require !== 'undefined') {
    if (typeof TextDecoder === 'undefined') (global as any).TextDecoder = require('util').TextDecoder;
}
it("Union roundtrip", () => {
    const obj = U.fromA({ b: 12345 });
    const bytes = U.encode(obj);
    const obj2 = U.decode(bytes);
    expect(obj).toEqual(obj2);
});

it("Union weird discriminator order roundtrip", () => {
    const obj = WeirdOrder.fromTwoComesFirst({ b: 99 });
    const bytes = WeirdOrder.encode(obj);
    const obj2 = WeirdOrder.decode(bytes);
    expect(obj).toEqual(obj2);
});

