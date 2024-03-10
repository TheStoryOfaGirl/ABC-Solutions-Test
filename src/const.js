export const blocksForm = {
    info: [
        {
            name: 'firstName',
            label: 'Имя*',
            iconPath: 'person.svg',
            isRequired: true
        },
        {
            name: 'lastName',
            label: 'Фамилия*',
            iconPath: 'person.svg',
            isRequired: true
        },
        {
            name: 'patronymic',
            label: 'Отчество',
            iconPath: 'person.svg',
            isRequired: false
        },
        {
            name: 'SNILS',
            label: 'СНИЛС',
            iconPath: 'numeric.svg',
            isRequired: false
        }
    ],
    contacts: [
        {
            name: 'phone',
            label: 'Телефон*',
            iconPath: 'stay-primary-portrait.svg',
            isRequired: true
        },
        {
            name: 'email',
            label: 'Электронная почта*',
            iconPath: 'briefcase-account.svg',
            isRequired: true
        }
    ]
}