// ✅ phone (FIXED: val.test was wrong)
export const isPhone = (val) => {
    return /[0-9]{9,14}/.test(val)
}

// ✅ image type
export const isValidImgType = (file) => {
    return /\.(jpe?g|png)$/i.test(file.name)
}

// ✅ pdf type
export const isValidPDFType = (file) => {
    return /\.pdf$/i.test(file.name)
}

// ✅ size (KB)
export const isValidImgSize = (fileSize, maxSize) => {
    const sizeInMB = fileSize / 1024
    return sizeInMB <= maxSize
}

// ✅ multiple files size (FIXED loop bug)
export const isValidFileSize = (files) => {
    if (!files) return true

    for (let i = 0; i < files.length; i++) {
        if (files[i]?.size / 1024 >= 512) return false
    }

    return true
}

// ✅ file type (PDF only)
export const isValidFileType = (files) => {
    if (!files) return true

    for (let i = 0; i < files.length; i++) {
        if (files[i]?.type && files[i].type !== 'application/pdf') {
            return false
        }
    }

    return true
}

// ✅ image files only
export const isValidFileImage = (files) => {
    if (!files) return true

    for (let i = 0; i < files.length; i++) {
        if (files[i]?.type && !files[i].type.includes('image')) {
            return false
        }
    }

    return true
}

// ✅ required
export const isRequired = (value) => {
    return value !== '' && value !== null && value !== undefined
}

// ✅ phone (ksa example)
export const validPhoneNumber = (value) => {
    return /^(05|5|009665|\+9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/.test(value)
}

// ✅ numbers only
export const validateNumber = (value) => {
    return /^\d+$/.test(value)
}

// ✅ arabic → english numbers
export const convertArabicNumberToEnglishNumber = (value) => {
    return value.replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632)
}

// ✅ strong password
export const strongPassword = (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
}