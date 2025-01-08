import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function FinancialCalculator({ cardetails }) {
    const [price, setPrice] = useState(cardetails?.sellingPrice);
    const [rateOfInterest, setRateOfInterest] = useState(0);
    const [loanTenure, setLoanTenure] = useState(0);
    const [downPayment, setDownpayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState();

    const calculateMonthlyPayment = () => {
        const loanAmount = price - downPayment;
        const monthlyRate = rateOfInterest / 12 / 100;
        const months = loanTenure;

        if (loanAmount > 0 && monthlyRate > 0 && months > 0) {
            const emi =
                (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

            setMonthlyPayment(emi.toFixed(2));
        } else {
            setMonthlyPayment("Invalid input");
        }
    };



    return (
        <div>
            <div className='border p-10  shadow-lg rounded-xl mt-5'>
                <h2 className='font-bold text-2xl'>Financial Calculator</h2>
                <div className='flex gap-5 w-full  mt-5'>
                    <div className='w-full'>
                        <label>Price $</label>
                        <Input type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className='w-full'>
                        <label>Rate of Interest $</label>
                        <Input type='number'
                            value={rateOfInterest}
                            onChange={(e) => setRateOfInterest(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex gap-5 w-full  mt-5 '>
                    <div className='w-full'>
                        <label>Loan Term (In Months)</label>
                        <Input type='number'
                            value={loanTenure}
                            onChange={(e) => setLoanTenure(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <label>Downpayment</label>
                        <Input type='number'
                            value={downPayment}
                            onChange={(e) => setDownpayment(e.target.value)}
                        />
                    </div>
                </div>
                {monthlyPayment && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Monthly Payment: ₹{monthlyPayment}</h3>
                    </div>
                )}
                <Button className='bg-blue-500 w-full mt-5'
                    onClick={calculateMonthlyPayment}
                >Calculate</Button>


            </div>


        </div>
    )
}

export default FinancialCalculator