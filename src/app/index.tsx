import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useEffect, useRef } from 'react';
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

function KonnectionsMark({ size = 108 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024">
      <Path d="M164 90H318L370 142V832L327 878H164Z" fill="#0B2347" />
      <Path d="M524 144H875L873 245L744 374L691 438L603 526L523 513L501 434L574 351L654 272L733 182H524Z" fill="#0E9FB9" />
      <Path d="M563 573L643 520L721 586V621L820 701L903 793V878H746L704 833L666 822L662 788L551 676Z" fill="#0B2347" />
      <Circle cx="503" cy="514" r="49" fill="#0B2347" />
    </Svg>
  );
}

export default function AuthScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const rays = useRef(new Animated.Value(0)).current;
  const cloud = useRef(new Animated.Value(0)).current;
  const theme = isDark
    ? {
        background: '#001532',
        text: '#FFFFFF',
        textSecondary: '#B9C2D4',
        accent: '#F7B84B',
        accentSoft: 'rgba(247, 184, 75, 0.22)',
        cloud: 'rgba(255,255,255,0.16)',
        cloudSoft: 'rgba(255,255,255,0.10)',
      }
    : {
        background: '#F5F8FB',
        text: '#10213D',
        textSecondary: '#5C667A',
        accent: '#F2B84B',
        accentSoft: 'rgba(242, 184, 75, 0.18)',
        cloud: 'rgba(255,255,255,0.88)',
        cloudSoft: 'rgba(255,255,255,0.60)',
      };

  useEffect(() => {
    const rayLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(rays, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(rays, {
          toValue: 0,
          duration: 2400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    const cloudLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(cloud, {
          toValue: 1,
          duration: 5200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(cloud, {
          toValue: 0,
          duration: 5200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    rayLoop.start();
    cloudLoop.start();
    return () => {
      rayLoop.stop();
      cloudLoop.stop();
    };
  }, [cloud, rays]);

  const rayOpacity = rays.interpolate({
    inputRange: [0, 1],
    outputRange: [0.22, 0.44],
  });
  const rayScale = rays.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.04],
  });
  const cloudX = cloud.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 10],
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: theme.background },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.topArt} pointerEvents="none">
            <Animated.View
              style={[
                styles.sunCore,
                {
                  backgroundColor: theme.accent,
                  opacity: rayOpacity,
                  transform: [{ scale: rayScale }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.rays,
                {
                  opacity: rayOpacity,
                  transform: [{ scale: rayScale }],
                  backgroundColor: theme.accentSoft,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.cloudLeft,
                {
                  backgroundColor: theme.cloud,
                  transform: [{ translateX: cloudX }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.cloudRight,
                {
                  backgroundColor: theme.cloudSoft,
                  transform: [{ translateX: cloudX }],
                },
              ]}
            />
          </View>
          <View style={styles.markCluster}>
            <KonnectionsMark size={96} />
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
              <Text style={[styles.chipText, { color: theme.text }]}>Community updates</Text>
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
  topArt: {
    width: '100%',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -8,
  },
  rays: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.3,
  },
  sunCore: {
    position: 'absolute',
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  cloudLeft: {
    position: 'absolute',
    top: 20,
    left: 24,
    width: 96,
    height: 30,
    borderRadius: 999,
    opacity: 0.55,
  },
  cloudRight: {
    position: 'absolute',
    top: 12,
    right: 30,
    width: 74,
    height: 26,
    borderRadius: 999,
    opacity: 0.42,
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
