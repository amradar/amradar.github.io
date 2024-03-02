import {Box, Button, HStack, VStack, useToast} from '@chakra-ui/react';
import styles from './App.module.scss';
import useSound from 'use-sound';

import angywanya from './wanya/angywanya.wav';
import bigwanya from './wanya/bigwanya.wav';
import complainingwanya from './wanya/complainingwanya.wav';
import gumpywanya from './wanya/gumpywanya.wav';
import sadwanya from './wanya/sadwanya.wav';
import sleepywanya from './wanya/sleepywanya.wav';
import wanya from './wanya/wanya.wav';
import wanyawanya from './wanya/wanyawanya.wav';
import wanywanwaywanwywnawanywa from './wanya/wanywanwaywanwywnawanywa.wav';
import {useCallback, useEffect, useMemo, useState} from 'react';
import bandees_0_0 from './bandees/bandees_0_0.png';
// import bandees_0_1 from './bandees/bandees_0_1.png';
import bandees_0_2 from './bandees/bandees_0_2.png';
import bandees_0_3 from './bandees/bandees_0_3.png';
import bandees_0_4 from './bandees/bandees_0_4.png';
// import bandees_0_5 from './bandees/bandees_0_5.png';
// import bandees_0_6 from './bandees/bandees_0_6.png';
// import bandees_1_0 from './bandees/bandees_1_0.png';
import bandees_1_1 from './bandees/bandees_1_1.png';
import bandees_1_2 from './bandees/bandees_1_2.png';
import bandees_1_3 from './bandees/bandees_1_3.png';
import bandees_1_4 from './bandees/bandees_1_4.png';
import bandees_1_5 from './bandees/bandees_1_5.png';
// import bandees_1_6 from './bandees/bandees_1_6.png';
import bandeeswing from './bandees/bandeeswing.gif';

function App() {
  const toast = useToast();

  const [angywanyaSound] = useSound(angywanya);
  const [bigwanyaSound] = useSound(bigwanya);
  const [complainingwanyaSound] = useSound(complainingwanya);
  const [gumpywanyaSound] = useSound(gumpywanya);
  const [sadwanyaSound] = useSound(sadwanya);
  const [sleepywanyaSound] = useSound(sleepywanya);
  const [wanyaSound] = useSound(wanya);
  const [wanyawanyaSound] = useSound(wanyawanya);
  const [wanywanwaywanwywnawanywaSound] = useSound(wanywanwaywanwywnawanywa);

  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  const [keyToWavDuration, setKeyToWavDuration] = useState<
    Record<string, number>
  >({});

  const keysAndWavs = useMemo(() => {
    return [
      {key: 'a', wav: angywanya},
      {key: 's', wav: bigwanya},
      {key: 'd', wav: complainingwanya},
      {key: 'f', wav: gumpywanya},
      {key: 'g', wav: sadwanya},
      {key: 'h', wav: sleepywanya},
      {key: 'j', wav: wanya},
      {key: 'k', wav: wanyawanya},
      {key: 'l', wav: wanywanwaywanwywnawanywa},
    ];
  }, []);

  const waddles = useMemo(
    () => [
      {key: 'a', playSound: wanyaSound, image: bandees_0_0},
      {key: 's', playSound: wanyawanyaSound, image: bandees_1_4},
      {key: 'd', playSound: wanywanwaywanwywnawanywaSound, image: bandees_0_2},
      {key: 'f', playSound: angywanyaSound, image: bandees_1_2},
      {key: 'g', playSound: bigwanyaSound, image: bandees_1_5},
      {key: 'h', playSound: sadwanyaSound, image: bandees_0_3},
      {key: 'j', playSound: sleepywanyaSound, image: bandees_1_1},
      {key: 'k', playSound: gumpywanyaSound, image: bandees_0_4},
      {key: 'l', playSound: complainingwanyaSound, image: bandees_1_3},
    ],
    [
      angywanyaSound,
      bigwanyaSound,
      complainingwanyaSound,
      gumpywanyaSound,
      sadwanyaSound,
      sleepywanyaSound,
      wanyaSound,
      wanyawanyaSound,
      wanywanwaywanwywnawanywaSound,
    ],
  );

  useEffect(() => {
    keysAndWavs.forEach(({key, wav}) => {
      const audio = new Audio(wav);

      audio.addEventListener('loadedmetadata', () => {
        if (key === 'l') {
          console.log(audio.duration);
        }
        setKeyToWavDuration((prev) => ({
          ...prev,
          [key]: audio.duration,
        }));
      });
    });
  }, [keysAndWavs]);

  const onKeyClick = useCallback(
    (clickedKey: string) => {
      const waddle = waddles.find(({key}) => key === clickedKey);

      if (!waddle) {
        return;
      }

      waddle.playSound();

      const button = document.getElementById(`wanya-button-${waddle.key}`);

      setPressedKeys((prev) => new Set([...prev, waddle.key]));

      setTimeout(() => {
        setPressedKeys((prev) => {
          const newSet = new Set(...prev);
          newSet.delete(waddle.key);
          return newSet;
        });
      }, Math.max(keyToWavDuration[waddle.key] * 1000, 400));

      if (button) {
        button.focus();
      }
    },
    [keyToWavDuration, waddles],
  );

  const bigWanya = () => {
    waddles.forEach((waddle) => {
      onKeyClick(waddle.key);
    });

    toast({
      title: 'bandee says',
      description: 'WANYA!!!',
      colorScheme: 'red',
      isClosable: true,
    });
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      console.log('here');
      onKeyClick(String.fromCharCode(event.keyCode));
    };

    window.addEventListener('keypress', handler);

    return () => {
      window.removeEventListener('keypress', handler);
    };
  }, [onKeyClick]);

  return (
    <div className={styles.App}>
      <VStack align="center">
        <HStack spacing="24px">
          <Box w="40px" h="40px" bg="bisque">
            1
          </Box>
          <Box w="40px" h="40px" bg="tomato">
            2
          </Box>
          <Box w="40px" h="40px" bg="orange.200">
            3
          </Box>
        </HStack>
        <p>wanya world i am a waddle dee</p>

        <img src={bandeeswing} />

        <HStack>
          {waddles.map(({key, image}) => (
            <Button
              key={key}
              id={`wanya-button-${key}`}
              colorScheme="orange"
              onClick={() => onKeyClick(key)}
            >
              {pressedKeys.has(key) ? (
                <img width="40" height="40" src={image} />
              ) : (
                key.toUpperCase()
              )}
            </Button>
          ))}
        </HStack>

        <Button colorScheme="orange" onClick={bigWanya}>
          WANYA!!!
        </Button>
      </VStack>
    </div>
  );
}

export default App;
