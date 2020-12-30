"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var user = new mongoose_1.default.Schema({
    fullName: String,
    phone: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    bvn: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model("User", user);
//# sourceMappingURL=User.js.map