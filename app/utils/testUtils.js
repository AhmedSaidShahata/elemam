import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';


const postMock = vi.fn();
const deleteMock = vi.fn();

import { createPinia } from 'pinia'
vi.mock('../composables/useApi', () => ({
  default: vi.fn(() => ({
    post: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
    errorsResponse: ref(null),
    loading: ref(false),
  })),
}));

export const initAdapter = () => {
  return {
    onPost: (url) => ({
      reply: (status, data) => postMock.mockResolvedValue({ status, data }),
      networkError: () => postMock.mockRejectedValue(new Error('Network Error')),
    }),
    onDelete: (url) => ({
      reply: (status, data) => deleteMock.mockResolvedValue({ status, data }),
      networkError: () => deleteMock.mockRejectedValue(new Error('Network Error')),
    })
  };
};

export const mockPostRequests = (axios, url, data) => {
  return {
    ok: () => axios.onPost(url).reply(200, data),
    serverError: () => axios.onPost(url).networkError(),
    validationError: () => axios.onPost(url).reply(422, data),
  };
};

export const mockDeleteRequests = (axios, url, data) => {
  return {
    ok: () => axios.onDelete(url).reply(200, data),
    serverError: () => axios.onDelete(url).networkError(),
    conflictError: () => axios.onDelete(url).reply(409, data),
  };
};

vi.mock('#imports', () => ({
  useLocalePath: () => (p) => p,
}))


vi.mock('#i18n', () => ({
  useLocalePath: () => vi.fn((path) => path)
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useRoute: vi.fn(() => ({
    query: vi.fn(),
  })),
}));

// Mock $t function
const mockI18n = {
  install(app) {
    app.config.globalProperties.$t = (key) => key;
  },
};

export function mountComponent(wrapper, options = {}) {
  const pinia = createPinia()
  return mount(wrapper, {
    global: {
      plugins: [pinia, mockI18n],
      ...(options.global || {}),
    },
    ...options,
  });
}
export function checkValidation(wrapper, selector, expectedValidation) {
  const formGroup = wrapper.find(selector);
  expect(formGroup.exists()).toBe(true);
  expect(formGroup.attributes("validation")).toBe(expectedValidation);
}


export const mockingApiCreate = async (wrapper, endPoint, form, method, post, expected, reset = false, resetData, router, redirect = null) => {

  post.mockResolvedValueOnce(form);
  if (typeof method === 'function') {
    await method(router);
  } else {
    await wrapper.vm[method]();
  }
  it("expected mocking call api with expected url and data ", () => {
    expect(post).toHaveBeenCalledWith(endPoint, expected);
  });

  if (redirect) {
    it("expected call route with expected route ", () => {
      expect(router.push).toHaveBeenCalledWith(redirect);
    });
  }

  if (reset) {
    await wrapper.vm[resetData];
  }
};



export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}