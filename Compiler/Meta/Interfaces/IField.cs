﻿namespace Compiler.Meta.Interfaces
{
    /// <summary>
    ///     A field represents any type that is declared directly in a <see cref="AggregateKind"/>.
    ///     Fields are members of their containing type.
    /// </summary>
    public interface IField
    {
        /// <summary>
        ///     The name of the current member.
        /// </summary>
        public string Name { get; }

        /// <summary>
        ///     Indicates either the <see cref="ScalarType"/> or
        ///     a defined <see cref="AggregateKind"/>.
        /// </summary>
        public int TypeCode { get; }

        /// <summary>
        ///     The line coordinate where the member was found.
        /// </summary>
        public uint Line { get; }

        /// <summary>
        ///     The column coordinate where the member begins.
        /// </summary>
        public uint Column { get; }

        /// <summary>
        ///     Indicates whether the member is declared as an array.
        /// </summary>
        public bool IsArray { get; }

        /// <summary>
        ///     Indicates if the member has been marked as no longer recommended for use.
        /// </summary>
        public DeprecatedAttribute? DeprecatedAttribute { get; }

        /// <summary>
        ///     A literal value associated with the member.
        /// </summary>
        /// <remarks>
        ///     For an <see cref="AggregateKind.Enum"/> this value corresponds to a defined member, and for
        ///     <see cref="AggregateKind.Message"/> a unique index.
        ///     It will be zero for <see cref="AggregateKind.Struct"/>.
        /// </remarks>
        public int ConstantValue { get; }

        /// <summary>
        ///     Is this field's type a scalar type?
        /// </summary>
        public bool IsScalar { get => TypeCode < 0; }

        /// <summary>
        ///     Is this field's type an aggregate type?
        /// </summary>
        public bool IsAggregate { get => TypeCode >= 0; }
    }
}
