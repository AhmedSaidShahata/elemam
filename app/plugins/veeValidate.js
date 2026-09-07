import { localize, setLocale } from '@vee-validate/i18n';
import { defineRule, configure } from 'vee-validate';
import { required, between, email, confirmed, min, max, numeric, min_value, max_value } from '@vee-validate/rules';
import en from '../utils/veeValidate/en.json';
import ar from '../utils/veeValidate/ar.json';
import cookies from 'js-cookie';
import { strongPassword } from '../utils/validate';


export default defineNuxtPlugin(async (nuxtApp) => {
    configure({
        generateMessage: localize({
            ar,
            en,
        },
        ),
    });
    setLocale(cookies.get('_lang') || 'en')
    defineRule('required', required);
    defineRule('email', email);
    defineRule('between', between);
    defineRule('confirmed', confirmed);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('min_value', min_value);
    defineRule('max_value', max_value);
    defineRule('alpha', (value) => {
    if (!value) return true;

    return /^[\u0621-\u064A\u0660-\u0669a-zA-Z- ]+$/.test(value);
    });    
    defineRule('numeric', numeric);
    defineRule('required_boolean', (value) => {
        if (value === null || value === undefined || value === '') {
            return false;
        }
        return true;
    });
    defineRule('max_words', (value, [args]) => {
        if (!value) return true;
        const words = value.trim().split(/\s+/);
        return words.length <= args;
      });
    defineRule('min_words', (value, [args]) => {
        if (!value) return true;
        const words = value.trim().split(/\s+/);
        return words.length <= args[0];
    });

    defineRule('numeric_max', (value, [maxLength] = []) => {
        if (!value) return true;

        const maxCount = parseInt(maxLength ?? '15', 10);
        const locale = nuxtApp.$i18n?.locale?.value || cookies.get('_lang') || 'en';
        const dict = locale === 'ar' ? ar : en;

        if (!/^\d+$/.test(value)) {
            return dict.messages.numeric;
        }

        if (value.length > maxCount) {
            return dict.messages.numeric_max.replace('0:{length}', maxCount).replace('{length}', maxCount);
        }

        return true;
    });

    defineRule('numeric_min', (value, [minLength] = []) => {
        if (!value) return true;

        const minCount = parseInt(minLength ?? '0', 10);
        const locale = nuxtApp.$i18n?.locale?.value || cookies.get('_lang') || 'en';
        const dict = locale === 'ar' ? ar : en;

        if (!/^\d+$/.test(value)) {
            return dict.messages.numeric;
        }

        if (value.length < minCount) {
            return dict.messages.numeric_min.replace('0:{length}', minCount).replace('{length}', minCount);
        }

        return true;
    });

    defineRule('strongPassword', (value) => {
        if (!value) return true;
        const locale = nuxtApp.$i18n?.locale?.value || cookies.get('_lang') || 'en';
        const dict = locale === 'ar' ? ar : en;

        if (!strongPassword(value)) {
            return dict.messages.strongPassword || 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        }
        return true;
    });

    defineRule('notSameOld', (value, [target]) => {
        if (!value || !target) return true;

        const locale = nuxtApp.$i18n?.locale?.value || cookies.get('_lang') || 'en';
        const dict = locale === 'ar' ? ar : en;

        return value !== target
            ? true
            : (
                dict.messages.new_password_same_as_old ||
                'New password cannot be the same as old password'
            );
    });

    defineRule('sameAsNew', (value, [target]) => {
        if (!value || !target) return true;

        const locale = nuxtApp.$i18n?.locale?.value || cookies.get('_lang') || 'en';
        const dict = locale === 'ar' ? ar : en;

        return value === target
            ? true
            : (
                dict.messages.passwords_do_not_match ||
                'Passwords do not match'
            );
    });

    defineRule('min_time', (value, [minTime]) => {
        if (!value || !minTime) return true;
        return value >= minTime;
    });

    defineRule('max_time', (value, [maxTime]) => {
        if (!value || !maxTime) return true;
        return value <= maxTime;
    });

})
