import { ref } from "vue";
import { useTheme } from "vuetify";
import { useCompanyStore } from "~/stores/company";

export const useColors = () => {
  const companyStore = useCompanyStore();
  const theme = useTheme();

  const primary = ref("#ffffff");
  const secondary = ref("#ffffff");
  const error = ref("#ff5252");

  const primaryColors = ref([
    { name: "--primary", alpha: 1 },
    { name: "--dark-primary", alpha: 0.5 },
    { name: "--light-primary", alpha: 0.1 },
  ]);

  const secondaryColors = ref([
    { name: "--secondary", alpha: 1 },
    { name: "--dark-secondary", alpha: 0.5 },
    { name: "--light-secondary", alpha: 0.1 },
  ]);

  const hexToRgb = (hex, alpha) => {
    if (!hex) return "";
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const setColors = (colorList, type) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    colorList.forEach((color) => {
      root.style.setProperty(color.name, hexToRgb(type, color.alpha));
    });
  };

  const initColors = () => {
    setColors(primaryColors.value, primary.value);
    setColors(secondaryColors.value, secondary.value);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("primary", primary.value);
      localStorage.setItem("secondary", secondary.value);
    }

    if (typeof document !== "undefined") {
      const body = document.body;
      setTimeout(() => {
        if (body) body.style.display = "block";
      }, 200);
    }
  };

  const changeTheme = () => {
    if (companyStore.company?.theme || companyStore.company?.advanced_theme) {
      primary.value =
        companyStore.company.advanced_theme?.primary_color ||
        companyStore.company.theme?.primary_color ||
        primary.value;
      secondary.value =
        companyStore.company.advanced_theme?.secondary_color ||
        companyStore.company.theme?.secondary_color ||
        secondary.value;
    }

    if (theme) {
      theme.themes.value.light.colors.primary = primary.value;
      theme.themes.value.light.colors.secondary = secondary.value;
    }

    initColors();
  };

  return {
    primary,
    secondary,
    primaryColors,
    secondaryColors,
    error,
    hexToRgb,
    setColors,
    initColors,
    changeTheme,
  };
};

export default useColors;
