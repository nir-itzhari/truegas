// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import CredentialsModel from '../../../Models/CredentialsModel';



// const LoginScreen: React.FC<{}> = ({ }) => {
//     const [credentials, setCredentials] = useState<CredentialsModel>(null);

//     const handleUserIdChange = (userId: string) => {
//         setCredentials({ ...credentials, userId });
//     };

//     const handlePasswordChange = (password: string) => {
//         setCredentials({ ...credentials, password });
//     };

//     const handleSubmit = () => {
//         // Make API request with axios or any other HTTP library
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>User ID:</Text>
//             <TextInput
//                 style={styles.input}
//                 value={credentials.userId}
//                 onChangeText={handleUserIdChange}
//             />
//             <Text style={styles.label}>Password:</Text>
//             <TextInput
//                 style={styles.input}
//                 value={credentials.password}
//                 onChangeText={handlePasswordChange}
//                 secureTextEntry={true}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                 <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20
//     },
//     label: {
//         fontSize: 18,
//         marginLeft: 0,
//         marginBottom: 10
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 20,
//         padding: 10
//     },
//     button: {
//         backgroundColor: 'blue',
//         padding: 15,
//         borderRadius: 5
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold'
//     }
// });

// export default LoginScreen;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm } from "react-hook-form";
import CredentialsModel from '../../../Models/CredentialsModel';

const LoginScreen: React.FC<{}> = ({ }) => {
    const { handleSubmit, register, formState: { errors, isValid } } = useForm<CredentialsModel>();

    const onSubmit = handleSubmit(({ userId, password }) => {
        // Make API request with axios or any other HTTP library
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>User ID:</Text>
            <TextInput
                style={styles.input}
                {...register('userId')}
            />
            {errors.userId && <Text style={styles.error}>{errors.userId.message}</Text>}
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                {...register('password')}
                secureTextEntry={true}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontSize: 18,
        marginLeft: 0,
        marginBottom: 10
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 0,
        marginTop: 5
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default LoginScreen;