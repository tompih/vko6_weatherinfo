import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
};

export default function Weather(props) {
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState(null); // New state for error handling

    useEffect(() => {
        const url = `${api.url}lat=${props.latitude}&lon=${props.longitude}&units=metric&appid=${api.key}`;

        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Weather data not available');
            }
            return res.json();
        })
        .then((json) => {
            console.log(json);
            setTemp(json.main.temp);
            setDescription(json.weather[0].description);
            setIcon(api.icons + json.weather[0].icon + '@2x.png');
        })
        .catch((error) => {
            setError(error.message); // Set error message in case of fetch failure
            console.error(error);
        });
    }, []);

    return (
        <View>
            {error ? ( // Display error message if there's an error
                <Text>{error}</Text>
            ) : (
                <>
                    <Text style={styles.temp}>{temp}</Text>
                    {icon && <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />}
                    <Text>{description}</Text>
                </>
            )}
        </View>
    );
}

const styles = {
    temp: {
        fontSize: 24,
        marginBottom: 10,
    },
};
