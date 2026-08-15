import { Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

type Provider = 'Apple' | 'Google' | 'Facebook';

const providerStyles: Record<Provider, { label: string; badge: string; iconBg: string; iconText: string }> = {
  Apple: {
    label: 'Continue with Apple',
    badge: '#111111',
    iconBg: '#FFFFFF',
    iconText: '#111111',
  },
  Google: {
    label: 'Continue with Google',
    badge: '#FFFFFF',
    iconBg: '#FFFFFF',
    iconText: '#4285F4',
  },
  Facebook: {
    label: 'Continue with Facebook',
    badge: '#1877F2',
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
        { backgroundColor: palette.badge, borderColor: pressed ? '#D9E2F2' : 'transparent' },
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

function KonnectionsMark({ size = 108, navy = '#0B2347' }: { size?: number; navy?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Path d="M227 207H340L400 267V756L340 817H227Z" fill={navy} />
      <Path d="M682 207H797V338L601 529L497 415Z" fill="#0E9FB9" />
      <Path d="M612 531L800 712V817H680L525 660V610Z" fill={navy} />
      <Circle cx="506" cy="516" r="65" fill={navy} />
    </Svg>
  );
}

export default function AuthScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = isDark
    ? {
        background: '#001532',
        text: '#FFFFFF',
        textSecondary: '#B9C2D4',
        accentSoft: 'rgba(247, 184, 75, 0.22)',
      }
    : {
        background: '#F5F8FB',
        text: '#10213D',
        textSecondary: '#5C667A',
        accentSoft: 'rgba(242, 184, 75, 0.18)',
      };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: theme.background },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.markCluster}>
            <KonnectionsMark size={118} navy={isDark ? '#FFFFFF' : '#0B2347'} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Get ready to konnect.</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Built for residents 55+ to konnect, participate, and stay informed.
          </Text>
          <View style={styles.chips}>
            <View
              style={[
                styles.chip,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
                  borderColor: theme.accentSoft,
                },
              ]}>
              <Text style={[styles.chipText, { color: theme.text }]}>55+ friendly</Text>
            </View>
            <View
              style={[
                styles.chip,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
                  borderColor: theme.accentSoft,
                },
              ]}>
              <Text style={[styles.chipText, { color: theme.text }]}>Stay connected</Text>
            </View>
          </View>
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
    paddingHorizontal: 24,
    paddingVertical: 28,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 6,
  },
  markCluster: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 29,
    lineHeight: 33,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
    maxWidth: 320,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 2,
  },
  chip: {
    minHeight: 30,
    borderRadius: 999,
    paddingHorizontal: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  stack: {
    gap: 10,
  },
  button: {
    minHeight: 54,
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
  },
  buttonPressed: {
    transform: [{ scale: 0.997 }],
    opacity: 0.97,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 15,
    lineHeight: 17,
    fontWeight: '800',
  },
  buttonLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.05,
  },
  googleLabel: {
    color: '#1F2937',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 8,
  },
});
