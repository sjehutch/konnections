import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Provider = 'Apple' | 'Google' | 'Facebook';

const providerStyles: Record<
  Provider,
  { label: string; badge: string; badgeText: string; iconBg: string; iconText: string }
> = {
  Apple: {
    label: 'Continue with Apple',
    badge: '#111111',
    badgeText: '#FFFFFF',
    iconBg: '#FFFFFF',
    iconText: '#111111',
  },
  Google: {
    label: 'Continue with Google',
    badge: '#FFFFFF',
    badgeText: '#4285F4',
    iconBg: '#FFFFFF',
    iconText: '#4285F4',
  },
  Facebook: {
    label: 'Continue with Facebook',
    badge: '#1877F2',
    badgeText: '#FFFFFF',
    iconBg: 'rgba(255,255,255,0.14)',
    iconText: '#FFFFFF',
  },
};

function ProviderButton({ provider }: { provider: Provider }) {
  const palette = providerStyles[provider];

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.badge,
          borderColor: pressed ? Colors.light.backgroundSelected : 'transparent',
        },
        pressed && styles.buttonPressed,
      ]}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: palette.iconBg,
            borderColor: provider === 'Google' ? '#D5D7DD' : 'transparent',
          },
        ]}>
        <Text style={[styles.badgeText, { color: palette.iconText }]}>
          {provider === 'Apple' ? 'A' : provider === 'Google' ? 'G' : 'f'}
        </Text>
      </View>
      <Text style={[styles.buttonLabel, provider === 'Google' && styles.googleLabel]}>{palette.label}</Text>
    </Pressable>
  );
}

export default function AuthScreen() {
  const theme = useTheme();
  const isDark = theme.background === Colors.dark.background;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View
        pointerEvents="none"
        style={[
          styles.backgroundGlow,
          { backgroundColor: isDark ? '#0B2A54' : '#D9F5F4' },
        ]}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: theme.background },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={[styles.title, { color: theme.text }]}>Get ready to connect.</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Built for residents 55+ to belong, participate, and stay informed.
          </Text>
        </View>

        <View style={styles.stack}>
          <ProviderButton provider="Apple" />
          <ProviderButton provider="Google" />
          <ProviderButton provider="Facebook" />
        </View>

        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          By continuing, you agree to the community experience for your property.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing.five,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
    maxWidth: 340,
  },
  stack: {
    gap: Spacing.two,
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    borderWidth: 1,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.94,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '800',
  },
  buttonLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  googleLabel: {
    color: '#1F2937',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: Spacing.two,
  },
  backgroundGlow: {
    position: 'absolute',
    top: -180,
    right: -160,
    width: 340,
    height: 340,
    borderRadius: 340,
    opacity: 0.35,
  },
});
