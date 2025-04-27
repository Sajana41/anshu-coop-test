"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/patients', patients_1.default);
const PORT = 5100;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
