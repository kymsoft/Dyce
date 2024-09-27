/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const components: { title: string; href: string; description: string }[] = [
  {
    title: "Learn",
    href: "/learn",
    description:
      "Visit our resource centers and acquire knowledge on how to operate our systems.",
  },
  {
    title: "Connect",
    href: "/connect",
    description:
      "Connect with us via social links, our newsletter, and community forum.",
  },
  {
    title: "Developers",
    href: "/developers",
    description:
      "For integrating our APIs, visit our docs to learn and integrate our systems for businesses.",
  },
  
]
