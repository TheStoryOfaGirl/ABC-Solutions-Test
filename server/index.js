import express from "express";
import path from "path";
import homepageRouter from "./homePageRouter.js";
import assetsRouter from "./assetsRouter.js";
import { validateEmail, validateFullName, validatePhone, validateSNILS } from "./validateData.js";

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
let invalidFields = [];

const app = express();

function addInvalidFieldsList(isValid, label) {
    if (!isValid) {
        invalidFields.push(label);
    }
}

app.get("/api/positions", (_req, res) => {
    res.json({
        positions: ["Разработчик программного обеспечения",
            "Тестировщик программного обеспечения",
            "Системный аналитик",
            "Веб-разработчик",
            "UX/UI дизайнер",
            "Мобильный разработчик",
            "Специалист по информационной безопасности",
            "Менеджер проектов",
            "DevOps инженер",
            "Data Scientist"
        ]
    });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/sendForm", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const isValidFirstName = validateFullName(req.body.firstName, 'firstName');
    const isValidLastName = validateFullName(req.body.lastName, 'lastName');
    const isValidPatronymic = validateFullName(req.body.patronymic, 'patronymic');
    const isValidSNILS = validateSNILS(req.body.SNILS);
    const isValidPosition = req.body.position !== 'не указано';
    const isValidPhone = validatePhone(req.body.phone);
    const isValidEmail = validateEmail(req.body.email);
    addInvalidFieldsList(isValidFirstName, "Имя");
    addInvalidFieldsList(isValidLastName, "Фамилия");
    addInvalidFieldsList(isValidPatronymic, "Отчество");
    addInvalidFieldsList(isValidSNILS, "СНИЛС");
    addInvalidFieldsList(isValidPosition, "Должность");
    addInvalidFieldsList(isValidPhone, "Телефон");
    addInvalidFieldsList(isValidEmail, "Электронная почта");
    if (isValidFirstName && isValidLastName && isValidPatronymic && isValidSNILS && isValidPosition && isValidPhone) {
        res.status(200);
        invalidFields = [];
    }
    else {
        res.status(400).json({ invalidFields: invalidFields });
        invalidFields = [];
    }
});

app.use("/", express.static(publicPath));
app.use("/src", assetsRouter);
app.use(homepageRouter);

app.listen(port, () => {
    console.log("Server listening on port", port);
});