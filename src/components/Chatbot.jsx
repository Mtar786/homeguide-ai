
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Chatbot.css';
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase/firebaseConfig';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(0);
    const [preferences, setPreferences] = useState({
        location: '',
        budget: '',
        bedrooms: '',
        name: '',
        email: '',
        moveInDate: new Date(),
    });
    const [listings] = useState([
        { id: 1, title: 'Cozy Apartment in Downtown', price: '$2,000/mo', bedrooms: 2 },
        { id: 2, title: 'Spacious House with Yard', price: '$3,500/mo', bedrooms: 4 },
        { id: 3, title: 'Modern Loft with City Views', price: '$2,800/mo', bedrooms: 1 },
    ]);

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        // Chatbot logic based on step
        switch (step) {
            case 0: // Initial greeting
                setMessages(prev => [...prev, { text: "Hello! I'm your HomeGuide AI. Let's find your dream home. First, what location are you interested in?", sender: 'bot' }]);
                setStep(1);
                break;
            case 1: // Location
                setPreferences(prev => ({ ...prev, location: input }));
                setMessages(prev => [...prev, { text: "Great! What's your approximate budget for this home?", sender: 'bot' }]);
                setStep(2);
                break;
            case 2: // Budget
                setPreferences(prev => ({ ...prev, budget: input }));
                setMessages(prev => [...prev, { text: "And how many bedrooms are you looking for?", sender: 'bot' }]);
                setStep(3);
                break;
            case 3: // Bedrooms
                setPreferences(prev => ({ ...prev, bedrooms: input }));
                setMessages(prev => [...prev, { text: "Perfect! Now, to help me personalize your search, what's your name?", sender: 'bot' }]);
                setStep(4);
                break;
            case 4: // Name
                setPreferences(prev => ({ ...prev, name: input }));
                setMessages(prev => [...prev, { text: "Thanks, " + input + "! What's your email address?", sender: 'bot' }]);
                setStep(5);
                break;
            case 5: // Email
                setPreferences(prev => ({ ...prev, email: input }));
                setMessages(prev => [...prev, { text: "Almost there! When are you looking to move in? Please select a date.", sender: 'bot' }]);
                setStep(6); // Move to date picker step
                break;
            case 6: // Date picker - user input is not directly used here, date is picked from calendar
                // This step is handled by onDateChange
                break;
            default:
                setMessages(prev => [...prev, { text: "Thank you for your information! We'll get back to you soon.", sender: 'bot' }]);
                console.log("Final Preferences:", preferences);
                setStep(7); // End of conversation
                break;
        }
    };

    const onDateChange = async (date) => {
        const finalPreferences = { ...preferences, moveInDate: date };
        setPreferences(finalPreferences);
        setMessages(prev => [...prev, { text: `You selected: ${date.toDateString()}`, sender: 'user' }]);
        setMessages(prev => [...prev, { text: "Thank you for your information! Here are some properties you might like:", sender: 'bot' }]);

        try {
            const docRef = await addDoc(collection(db, "leads"), finalPreferences);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setStep(7); // Move to property listings view
    };

    const handleBookViewing = (listingTitle) => {
        setMessages(prev => [...prev, { text: `You have booked a viewing for: ${listingTitle}. We will contact you shortly with the details.`, sender: 'bot' }]);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">HomeGuide AI Chat</div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {step === 6 && (
                    <div className="calendar-container">
                        <Calendar onChange={onDateChange} value={preferences.moveInDate} />
                    </div>
                )}
                {step === 7 && (
                    <div className="property-listings">
                        {listings.map(listing => (
                            <div key={listing.id} className="property-card">
                                <h3>{listing.title}</h3>
                                <p>Price: {listing.price}</p>
                                <p>Bedrooms: {listing.bedrooms}</p>
                                <button onClick={() => handleBookViewing(listing.title)} className="book-viewing-btn">Book a Viewing</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    disabled={step >= 6} // Disable input after date selection
                />
                <button onClick={handleSend} disabled={step >= 6}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
