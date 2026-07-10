"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryDTO = void 0;
const zod_1 = require("zod");
exports.createCategoryDTO = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "name is required"),
    description: zod_1.z.string().trim().optional(),
});
//# sourceMappingURL=categoryDTO.js.map