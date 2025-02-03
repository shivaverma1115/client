'use client';

import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import expiredImg from '@/assests/expiredImg.jpeg'
import { IWeddingInfoType } from '@/interFace/interFace';

export default function VideoTemplate({ weddingInfo: { url, title, isExpired } }: { weddingInfo: IWeddingInfoType }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [url]);

    // Handle play/pause functionality
    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Unmute the video after 500ms
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.muted = false;
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Flex justifyContent={'center'} alignItems={'center'} h={'90vh'} >
            <Container maxW={'7xl'}>
                <Stack
                    align={'center'}
                    gap={[8, 10]}
                    direction={['column', 'row']}
                >
                    <Stack flex={1} gap={[5, 10]}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={['3xl', '4xl', '6xl']}
                        >
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: '30%',
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    bg: 'red.400',
                                    zIndex: -1,
                                }}
                                color={'blue.800'}
                            >
                                Demo Video
                            </Text>
                            <br />
                            <Text as={'span'} color={'red.400'}>
                                {title}
                            </Text>
                        </Heading>
                        <Text color={'red.700'} fontWeight={'600'} >
                            This video has expired and is no longer available. Videos are accessible for up to 1 hour after release.
                        </Text>
                        <Stack gap={[4, 6]} direction={['column', 'row']}>
                            <Button
                                rounded={'full'}
                                size={'lg'}
                                fontWeight={'normal'}
                                px={6}
                                colorScheme={'red'}
                                bg={'red.400'}
                                _hover={{ bg: 'red.500' }}
                                onClick={handlePlayPause}
                                color={'white'}
                            >
                                Start/Stop Video
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex
                        flex={1}
                        justify={'center'}
                        align={'center'}
                        position={'relative'}
                        w={'full'}
                    >
                        <Flex
                            position={'relative'}
                            rounded={'2xl'}
                            boxShadow={'2xl'}
                            width={'fit-content'}
                            overflow={'hidden'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            {!isExpired ?
                                <>
                                    <Box
                                        position="absolute"
                                        top={2}
                                        right={2}
                                        bg="rgba(0, 0, 0, 0.5)"
                                        color="white"
                                        fontSize="sm"
                                        p={2}
                                        borderRadius="md"
                                        zIndex={10}
                                        pointerEvents="none" // Prevent user interaction
                                    >
                                        Global Creations
                                    </Box>
                                    <video
                                        ref={videoRef}
                                        loop
                                        autoPlay
                                        muted
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    >
                                        <source src={url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <Box
                                        position="absolute"
                                        bottom={4}
                                        left={0}
                                        width="100%"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                        zIndex={10}
                                    >
                                        <Box
                                            as="span"
                                            fontSize="sm"
                                            color="white"
                                            bg="rgba(0, 0, 0, 0.5)"
                                            px={4}
                                            py={1}
                                            borderRadius="md"
                                            display="inline-block"
                                            animation="marquee 50s linear infinite"
                                        >
                                            This video is for demonstration purposes only and not intended for professional use.
                                        </Box>
                                    </Box>
                                    <style>
                                        {`
                                @keyframes marquee {
                                    0% { transform: translateX(100%); }
                                    100% { transform: translateX(-100%); }
                                }
                            `}
                                    </style>
                                </>
                                : <>
                                    <Image
                                        src={expiredImg}
                                        alt="expired video url"
                                        layout="intrinsic" // Adjust the layout to "intrinsic" to maintain aspect ratio
                                        objectFit="cover"  // Use 'cover' to ensure the image covers the area
                                        objectPosition="center" // Optional: This centers the image
                                        quality={100}  // Optional: Adjust image quality (default is 75)
                                        style={{
                                            maxWidth: '100%', // Ensure the image does not overflow
                                            height: 'auto', // Maintain aspect ratio
                                        }}
                                    />
                                </>
                            }
                        </Flex>
                    </Flex>
                </Stack>
            </Container>
        </Flex>
    );
}
