import axios from 'axios'
import { ValidationError } from '../handlers/CustomErrorHandler'

const url = 'https://production.deepvue.tech/v1/verification/aadhaar'
// const apiKey = '4f8867fbdb3447f38931d5daad961a9e' // Replace with the actual API key

const getAccessToken = async () => {
    const url = 'https://production.deepvue.tech/v1/authorize'
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    const payload = {
        client_id: 'free_tier_faiz.beabrand_b4b4a33a2a',
        client_secret: '4f8867fbdb3447f38931d5daad961a9e',
    }

    const response = await axios.post(url, payload, { headers })
    return response.data.access_token
}
export const verifyAadhaar = async (aadhaarNumber: string) => {
    const accessToken = await getAccessToken()
    console.log(accessToken)
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': '4f8867fbdb3447f38931d5daad961a9e',
    }

    const params = {
        aadhaar_number: aadhaarNumber,
    }

    try {
        const response = await axios.get(url, { params, headers })
        console.log(response.data)
        return response.data.sub_code
    } catch (err) {
        console.log(err)
        throw new ValidationError('Invalid Aadhar Number here')
    }
}
