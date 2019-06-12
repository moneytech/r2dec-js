/* 
 * Copyright (C) 2019 elicn
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = (function() {
    const Expr = require('core2/analysis/ir/expressions');

    var Flag = function(f) {
        var flags = {
            'CF': 'eflags.cf',
            'PF': 'eflags.pf',
            'AF': 'eflags.af',
            'ZF': 'eflags.zf',
            'SF': 'eflags.sf',
            'DF': 'eflags.df',
            'OF': 'eflags.of'
        };

        // create a new instance of a 1-bit register
        return new Expr.Reg(flags[f], 1);
    };

    function Carry    (op) { Expr.UExpr.call(this, '<carry>', op); }
    function Parity   (op) { Expr.UExpr.call(this, '<parity>', op); }
    function Adjust   (op) { Expr.UExpr.call(this, '<adjust>', op); }
    function Zero     (op) { Expr.UExpr.call(this, '<zero>', op); }
    function Sign     (op) { Expr.UExpr.call(this, '<sign>', op); }
    function Overflow (op) { Expr.UExpr.call(this, '<overflow>', op); }

    Carry.prototype    = Object.create(Expr.UExpr.prototype);
    Parity.prototype   = Object.create(Expr.UExpr.prototype);
    Adjust.prototype   = Object.create(Expr.UExpr.prototype);
    Zero.prototype     = Object.create(Expr.UExpr.prototype);
    Sign.prototype     = Object.create(Expr.UExpr.prototype);
    Overflow.prototype = Object.create(Expr.UExpr.prototype);

    Carry.prototype.constructor    = Carry;
    Parity.prototype.constructor   = Parity;
    Adjust.prototype.constructor   = Adjust;
    Zero.prototype.constructor     = Zero;
    Sign.prototype.constructor     = Sign;
    Overflow.prototype.constructor = Overflow;

    /**
     * Create a special expression representing the operation of the given flag.
     * Note that the returned expression is arch-specific.
     * @param {string} f Flag token
     * @param {Expr.Expr} expr Expression to operate on (i.e. whose carry)
     * @returns {Expr.Expr}
     */
    var FlagOp = function(f, expr) {
        var ops = {
            'CF': Carry,
            'PF': Parity,
            'AF': Adjust,
            'ZF': Zero,
            'SF': Sign,
            'OF': Overflow
        };

        return new ops[f](expr);
    };

    return {
        Flag    : Flag,
        FlagOp  : FlagOp

        // Carry    : Carry,
        // Parity   : Parity,
        // Adjust   : Adjust,
        // Zero     : Zero,
        // Sign     : Sign,
        // Overflow : Overflow
    };
})();