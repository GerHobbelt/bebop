import { BebopView, BebopRuntimeError, readGuid } from "./index";
import { describe, expect, it, beforeEach } from "vitest";

describe("BebopView", () => {
  let view: BebopView;

  beforeEach(() => {
    view = BebopView.getInstance();
  });

  describe("Singleton pattern", () => {
    it("should return the same instance", () => {
      const view1 = BebopView.getInstance();
      const view2 = BebopView.getInstance();
      expect(view1).toBe(view2);
    });
  });

  describe("Basic read/write operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should write and read byte values", () => {
      const testValues = [0, 1, 127, 128, 255];

      for (const value of testValues) {
        view.writeByte(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readByte()).toBe(expected);
      }
    });

    it("should write and read uint16 values", () => {
      const testValues = [0, 1, 255, 256, 65535];

      for (const value of testValues) {
        view.writeUint16(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readUint16()).toBe(expected);
      }
    });

    it("should write and read int16 values", () => {
      const testValues = [-32768, -1, 0, 1, 32767];

      for (const value of testValues) {
        view.writeInt16(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readInt16()).toBe(expected);
      }
    });

    it("should write and read uint32 values", () => {
      const testValues = [0, 1, 255, 65536, 4294967295];

      for (const value of testValues) {
        view.writeUint32(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readUint32()).toBe(expected);
      }
    });

    it("should write and read int32 values", () => {
      const testValues = [-2147483648, -1, 0, 1, 2147483647];

      for (const value of testValues) {
        view.writeInt32(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readInt32()).toBe(expected);
      }
    });

    it("should write and read uint64 values", () => {
      const testValues = [0n, 1n, 255n, 18446744073709551615n];

      for (const value of testValues) {
        view.writeUint64(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readUint64()).toBe(expected);
      }
    });

    it("should write and read int64 values", () => {
      const testValues = [-9223372036854775808n, -1n, 0n, 1n, 9223372036854775807n];

      for (const value of testValues) {
        view.writeInt64(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readInt64()).toBe(expected);
      }
    });

    it("should write and read float32 values", () => {
      const testValues = [0.0, -1.5, 1.5, Math.PI, -Math.PI];

      for (const value of testValues) {
        view.writeFloat32(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readFloat32()).toBeCloseTo(expected, 6);
      }
    });

    it("should write and read float64 values", () => {
      const testValues = [0.0, -1.5, 1.5, Math.PI, -Math.PI, Number.MAX_VALUE];

      for (const value of testValues) {
        view.writeFloat64(value);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testValues) {
        expect(view.readFloat64()).toBe(expected);
      }
    });
  });

  describe("String operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should write and read empty string", () => {
      view.writeString("");

      const buffer = view.toArray();
      view.startReading(buffer);

      expect(view.readString()).toBe("");
    });

    it("should write and read ASCII strings", () => {
      const testStrings = ["hello", "world", "test123", "!@#$%"];

      for (const str of testStrings) {
        view.writeString(str);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testStrings) {
        expect(view.readString()).toBe(expected);
      }
    });

    it("should write and read UTF-8 strings", () => {
      const testStrings = ["Hello 世界", "🚀 emoji", "café", "naïve", "Ümlauts"];

      for (const str of testStrings) {
        view.writeString(str);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testStrings) {
        expect(view.readString()).toBe(expected);
      }
    });

    it("should handle long strings", () => {
      const longString = "a".repeat(1000);

      view.writeString(longString);

      const buffer = view.toArray();
      view.startReading(buffer);

      expect(view.readString()).toBe(longString);
    });
  });

  describe("Byte array operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should write and read empty byte arrays", () => {
      const emptyArray = new Uint8Array(0);
      view.writeBytes(emptyArray);

      const buffer = view.toArray();
      view.startReading(buffer);

      const result = view.readBytes();
      expect(result).toEqual(emptyArray);
      expect(result.length).toBe(0);
    });

    it("should write and read byte arrays", () => {
      const testArrays = [
        new Uint8Array([1, 2, 3]),
        new Uint8Array([255, 0, 128]),
        new Uint8Array(Array.from({ length: 100 }, (_, i) => i % 256))
      ];

      for (const arr of testArrays) {
        view.writeBytes(arr);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testArrays) {
        expect(view.readBytes()).toEqual(expected);
      }
    });
  });

  describe("GUID operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should write and read GUIDs", () => {
      const testGuids = [
        "00000000-0000-0000-0000-000000000000",
        "12345678-1234-1234-1234-123456789abc",
        "ffffffff-ffff-ffff-ffff-ffffffffffff",
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
      ];

      for (const guid of testGuids) {
        view.writeGuid(guid);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testGuids) {
        expect(view.readGuid()).toBe(expected);
      }
    });

    it("should handle GUIDs with mixed case", () => {
      const mixedCaseGuid = "A1B2C3D4-E5F6-7890-ABCD-EF1234567890";
      const expectedLowerCase = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

      view.writeGuid(mixedCaseGuid);

      const buffer = view.toArray();
      view.startReading(buffer);

      expect(view.readGuid()).toBe(expectedLowerCase);
    });
  });

  describe("Date operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should write and read dates", () => {
      const testDates = [
        new Date(0), // Unix epoch
        new Date("2023-01-01T00:00:00Z"),
        new Date("2023-12-31T23:59:59Z"),
        new Date(Date.now())
      ];

      for (const date of testDates) {
        view.writeDate(date);
      }

      const buffer = view.toArray();
      view.startReading(buffer);

      for (const expected of testDates) {
        const result = view.readDate();
        expect(result.getTime()).toBe(expected.getTime());
      }
    });
  });

  describe("Message length operations", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should reserve and fill message length", () => {
      const position = view.reserveMessageLength();
      view.writeString("test message");
      const messageLength = view.length - position - 4; // Subtract the 4 bytes for length prefix
      view.fillMessageLength(position, messageLength);

      const buffer = view.toArray();
      view.startReading(buffer);

      const readLength = view.readMessageLength();
      expect(readLength).toBe(messageLength);

      const message = view.readString();
      expect(message).toBe("test message");
    });
  });

  describe("Buffer management", () => {
    it("should handle buffer growth", () => {
      view.startWriting();

      // Write enough data to trigger buffer growth
      for (let i = 0; i < 100; i++) {
        view.writeString("This is a test string that should trigger buffer growth");
      }

      const buffer = view.toArray();
      expect(buffer.length).toBeGreaterThan(256); // Initial buffer size
    });

    it("should handle skip operation", () => {
      view.startWriting();
      view.writeUint32(12345);
      view.writeUint32(67890);

      const buffer = view.toArray();
      view.startReading(buffer);

      const first = view.readUint32();
      expect(first).toBe(12345);

      view.skip(4); // Skip the second uint32
      expect(view.index).toBe(8);
    });
  });

  describe("Error handling", () => {
    it("should create BebopRuntimeError with correct properties", () => {
      const error = new BebopRuntimeError("Test error message");
      expect(error.message).toBe("Test error message");
      expect(error.name).toBe("BebopRuntimeError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("Standalone GUID reading", () => {
    it("should read GUID from buffer using readGuid function", () => {
      // Create a buffer with a known GUID pattern
      const buffer = new Uint8Array(16);
      // Set up bytes for GUID: 12345678-1234-1234-1234-123456789abc
      buffer[0] = 0x78; buffer[1] = 0x56; buffer[2] = 0x34; buffer[3] = 0x12; // 12345678 (little-endian)
      buffer[4] = 0x34; buffer[5] = 0x12; // 1234 (little-endian)
      buffer[6] = 0x34; buffer[7] = 0x12; // 1234 (little-endian)
      buffer[8] = 0x12; buffer[9] = 0x34; // 1234 (big-endian)
      buffer[10] = 0x12; buffer[11] = 0x34; buffer[12] = 0x56; buffer[13] = 0x78; buffer[14] = 0x9a; buffer[15] = 0xbc; // 123456789abc (big-endian)

      const result = readGuid(buffer, 0);
      expect(result).toBe("12345678-1234-1234-1234-123456789abc");
    });
  });

  describe("Edge cases and boundary conditions", () => {
    beforeEach(() => {
      view.startWriting();
    });

    it("should handle reading from empty buffer", () => {
      const emptyBuffer = new Uint8Array(0);
      view.startReading(emptyBuffer);
      expect(view.length).toBe(0);
      expect(view.index).toBe(0);
    });

    it("should handle writing and reading maximum values", () => {
      // Test boundary values
      view.writeByte(255);
      view.writeUint16(65535);
      view.writeUint32(4294967295);
      view.writeInt16(-32768);
      view.writeInt32(-2147483648);

      const buffer = view.toArray();
      view.startReading(buffer);

      expect(view.readByte()).toBe(255);
      expect(view.readUint16()).toBe(65535);
      expect(view.readUint32()).toBe(4294967295);
      expect(view.readInt16()).toBe(-32768);
      expect(view.readInt32()).toBe(-2147483648);
    });

    it("should handle very long strings that exceed minimumTextDecoderLength", () => {
      // Create a string longer than the minimum text decoder length (300)
      const longString = "x".repeat(400);

      view.writeString(longString);

      const buffer = view.toArray();
      view.startReading(buffer);

      expect(view.readString()).toBe(longString);
    });
  });
});