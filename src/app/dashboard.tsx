import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { SymbolView, type SFSymbol } from 'expo-symbols';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Theme = {
  background: string;
  card: string;
  cardMuted: string;
  text: string;
  secondary: string;
  border: string;
  accent: string;
};

type FeedItem = {
  source: string;
  time: string;
  title: string;
  body: string;
  video?: boolean;
};

const feed: FeedItem[] = [
  {
    source: 'Instagram · Sarah',
    time: '12 min ago',
    title: "Emma's first violin recital",
    body: 'Your granddaughter shared a new video.',
    video: true,
  },
  {
    source: 'Oaks of Plano',
    time: 'Today',
    title: 'Breakfast menu',
    body: 'Scrambled eggs, oatmeal, fresh fruit, and coffee · 7:30–9:30 AM',
  },
  {
    source: 'Oaks of Plano',
    time: 'Today',
    title: 'Lunch menu',
    body: 'Grilled chicken, roasted vegetables, garden salad, and apple pie · 11:30 AM–1:30 PM',
  },
  {
    source: 'Community Events',
    time: 'Friday',
    title: 'Happy hour on the patio',
    body: 'Music, appetizers, and neighbors · 4:30 PM',
  },
  {
    source: 'Community Events',
    time: 'Saturday',
    title: 'Summer social',
    body: 'Join us in the clubhouse for games, music, and dessert · 6:00 PM',
  },
];

const reactions = [
  ['Like', '👍'],
  ['Love', '♥'],
  ['Surprise', '😮'],
] as const;

function FeedCard({ item, theme }: { item: FeedItem; theme: Theme }) {
  const [reaction, setReaction] = useState<string>();
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(0);
  const [playing, setPlaying] = useState(false);

  const sendComment = () => {
    if (!comment.trim()) return;
    setComments((value) => value + 1);
    setComment('');
    setCommenting(false);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.metaRow}>
        <Text style={[styles.source, { color: theme.accent }]}>{item.source}</Text>
        <Text style={[styles.time, { color: theme.secondary }]}>{item.time}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.cardBody, { color: theme.secondary }]}>{item.body}</Text>

      {item.video && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={playing ? 'Pause recital preview' : 'Play recital preview'}
          onPress={() => setPlaying((value) => !value)}
          style={styles.video}>
          <Image
            source={require('../../assets/images/recital-video.png')}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.playButton}>
            <SymbolView
              name={playing ? 'pause.fill' : 'play.fill'}
              size={28}
              tintColor="#FFFFFF"
            />
          </View>
        </Pressable>
      )}

      <View style={[styles.reactions, { borderTopColor: theme.border }]}>
        {reactions.map(([label, icon]) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: reaction === label }}
            key={label}
            onPress={() => setReaction(reaction === label ? undefined : label)}
            style={[styles.reaction, reaction === label && { backgroundColor: theme.cardMuted }]}>
            <Text style={styles.reactionIcon}>{icon}</Text>
            <Text style={[styles.reactionText, { color: reaction === label ? theme.accent : theme.secondary }]}>
              {label}
            </Text>
          </Pressable>
        ))}
        <Pressable
          accessibilityRole="button"
          onPress={() => setCommenting((value) => !value)}
          style={[styles.reaction, commenting && { backgroundColor: theme.cardMuted }]}>
          <Text style={styles.reactionIcon}>💬</Text>
          <Text style={[styles.reactionText, { color: theme.secondary }]}>Comment{comments ? ` ${comments}` : ''}</Text>
        </Pressable>
      </View>

      {commenting && (
        <View style={styles.commentRow}>
          <TextInput
            accessibilityLabel="Write a comment"
            placeholder="Write a comment"
            placeholderTextColor={theme.secondary}
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={sendComment}
            returnKeyType="send"
            style={[styles.commentInput, { backgroundColor: theme.cardMuted, color: theme.text }]}
          />
          <Pressable accessibilityRole="button" onPress={sendComment} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function NavItem({ label, symbol, active, theme }: { label: string; symbol: SFSymbol; active?: boolean; theme: Theme }) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} style={styles.navItem}>
      <SymbolView name={symbol} size={23} tintColor={active ? theme.accent : theme.secondary} />
      <Text style={[styles.navLabel, { color: active ? theme.accent : theme.secondary }]}>{label}</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const isDark = useColorScheme() === 'dark';
  const [weather, setWeather] = useState<{ temperature: number; feelsLike: number }>();
  const theme: Theme = isDark
    ? {
        background: '#001532',
        card: '#0A2342',
        cardMuted: '#153253',
        text: '#FFFFFF',
        secondary: '#B9C5D8',
        border: '#244261',
        accent: '#20B7CC',
      }
    : {
        background: '#F4F7FA',
        card: '#FFFFFF',
        cardMuted: '#EAF4F6',
        text: '#10213D',
        secondary: '#5C667A',
        border: '#DDE5EC',
        accent: '#087F92',
      };

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=33.0198&longitude=-96.6989&current=temperature_2m,apparent_temperature&temperature_unit=fahrenheit')
      .then((response) => response.json())
      .then(({ current }) => setWeather({
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
      }))
      .catch(() => setWeather(undefined));
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: theme.accent }]}>OAKS OF PLANO</Text>
          <Text style={[styles.title, { color: theme.text }]}>Good afternoon</Text>
          <Text style={[styles.subtitle, { color: theme.secondary }]}>Everything important, in one place.</Text>
        </View>

        <View style={styles.quickInfo}>
          <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.infoLabel, { color: theme.accent }]}>PLANO WEATHER</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {weather ? `${weather.temperature}°` : 'Loading…'}
            </Text>
            <Text style={[styles.infoDetail, { color: theme.secondary }]}>
              {weather ? `Feels like ${weather.feelsLike}°` : 'Current conditions'}
            </Text>
          </View>
          <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.infoLabel, { color: theme.accent }]}>NEARBY</Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>Walmart</Text>
            <Text style={[styles.infoDetail, { color: theme.secondary }]}>Closes 11 PM · 425 Coit Rd</Text>
          </View>
        </View>

        <View>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Connected apps</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.apps}>
            {['Instagram', 'Messages', 'Photos', '+ Connect'].map((app) => (
              <Pressable
                accessibilityRole="button"
                key={app}
                style={[styles.app, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={[styles.appText, { color: app === '+ Connect' ? theme.accent : theme.text }]}>{app}</Text>
                {app !== '+ Connect' && <Text style={[styles.connected, { color: theme.secondary }]}>Connected</Text>}
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Today</Text>
        {feed.map((item) => <FeedCard item={item} key={item.title} theme={theme} />)}
      </ScrollView>

      <GlassView
        colorScheme={isDark ? 'dark' : 'light'}
        glassEffectStyle="regular"
        isInteractive
        style={[styles.nav, { borderColor: theme.border }]}>
        <NavItem active label="Home" symbol="house.fill" theme={theme} />
        <NavItem label="Apps" symbol="square.grid.2x2.fill" theme={theme} />
        <NavItem label="Community" symbol="person.3.fill" theme={theme} />
      </GlassView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 130, gap: 16 },
  header: { gap: 4, paddingTop: 8, paddingBottom: 8 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { fontSize: 17, lineHeight: 24 },
  quickInfo: { flexDirection: 'row', gap: 10 },
  infoCard: { flex: 1, minHeight: 106, borderRadius: 18, borderWidth: 1, padding: 14, justifyContent: 'center' },
  infoLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  infoValue: { fontSize: 22, lineHeight: 28, fontWeight: '800', marginTop: 4 },
  infoDetail: { fontSize: 12, lineHeight: 17, marginTop: 2 },
  sectionTitle: { fontSize: 21, lineHeight: 27, fontWeight: '800' },
  apps: { gap: 10, paddingTop: 10 },
  app: { minWidth: 118, minHeight: 66, borderRadius: 16, borderWidth: 1, padding: 12, justifyContent: 'center' },
  appText: { fontSize: 16, fontWeight: '700' },
  connected: { fontSize: 12, marginTop: 4 },
  card: { borderRadius: 20, borderWidth: 1, padding: 16, gap: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  source: { flex: 1, fontSize: 14, fontWeight: '800' },
  time: { fontSize: 13 },
  cardTitle: { fontSize: 21, lineHeight: 27, fontWeight: '800' },
  cardBody: { fontSize: 16, lineHeight: 23 },
  video: { height: 190, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  playButton: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'rgba(0,21,50,0.78)', alignItems: 'center', justifyContent: 'center' },
  reactions: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, marginTop: 4 },
  reaction: { flex: 1, minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 2 },
  reactionIcon: { fontSize: 17, lineHeight: 20 },
  reactionText: { fontSize: 11, fontWeight: '700' },
  commentRow: { flexDirection: 'row', gap: 8 },
  commentInput: { flex: 1, minHeight: 46, borderRadius: 12, paddingHorizontal: 14, fontSize: 16 },
  sendButton: { minWidth: 64, minHeight: 46, borderRadius: 12, backgroundColor: '#0E9FB9', alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  nav: { position: 'absolute', left: 20, right: 20, bottom: 24, height: 76, borderRadius: 28, borderWidth: 1, flexDirection: 'row', overflow: 'hidden' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  navLabel: { fontSize: 12, fontWeight: '700' },
});
