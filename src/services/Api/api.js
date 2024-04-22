import axios from 'axios'

export const addReferrals = async ({refAddress, bonusBnb}) => {

    if (!refAddress, !bonusBnb) {
        return
    }
    const data = {
        "referralAddress": refAddress,
        "amount": bonusBnb
    }
    try {
        const res = await axios.post('http://localhost:8080/api/add-referral', data)
        console.log("referal added response", res);

    } catch (error) {
        console.log("error while saving referral", error)

    }

}

export const getTopReferrals = async ({ setReferals }) => {
    try {
        const res = await axios.get('http://localhost:8080/api/get-top-referrals')
        //console.log("top referal result", res)
        let result = []
        setReferals(res.data)
        const data = res?.data || []
        for (const item of data) {
            try {
                result.push({
                    "address": item?._id,
                    "count": item?.totalEarnings.toString()
                })

            } catch (error) {
                console.log("error while parsing referals data", error)

            }

        }
        setReferals(result)
        return result;

    } catch (error) {
        //console.log("error in gettin top referrals", error)

    }
}