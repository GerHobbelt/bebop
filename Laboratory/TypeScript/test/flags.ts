import * as G from './generated/gen';
import { it, expect } from 'vitest';
it("Supports flag enums", () => {
    // TypeScript already had no problem with using enums as numbers, so there
    // is not much to test here. Here's a sanity check:
    expect(G.TestFlags.ReadWrite).toEqual(G.TestFlags.Read | G.TestFlags.Write);
});
