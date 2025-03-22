import Modal from "../components/Modal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import { useState, useEffect } from 'preact/hooks';
import { isFormOpen, selectedAmount, toggleFormOpen, resetDonationState } from "../lib/donationState.js";
import { GlobalModal } from './GlobalModal';

const DonationForm = () => {
    const [formValues, setFormValues] = useState({
        holder_name: '',
        card_number: '',
        expiration_year: '',
        expiration_month: '',
        cvv2: '',
        amount: '500'
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    // Reset form to initial state
    const resetForm = () => {
        setFormValues({
            holder_name: '',
            card_number: '',
            expiration_year: '',
            expiration_month: '',
            cvv2: '',
            amount: '500'
        });
        setErrors({});

        // Reset global state
        resetDonationState();
    };

    // Enhanced input formatting
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;

        // Format specific fields with more robust validation
        switch (name) {
            case 'card_number':
                // Format card number with spaces every 4 digits
                formattedValue = value
                    .replace(/\D/g, '')
                    .slice(0, 19)
                    .replace(/(\d{4})(?=\d)/g, '$1 ')
                    .trim();
                break;
            case 'expiration_month':
                // Ensure month is between 01-12
                formattedValue = value.replace(/\D/g, '').slice(0, 2);
                if (parseInt(formattedValue) > 12) {
                    formattedValue = '12';
                }
                break;
            case 'expiration_year':
                // Limit to current decade
                formattedValue = value.replace(/\D/g, '').slice(0, 2);
                break;
            case 'cvv2':
                // Strict CVV validation
                formattedValue = value.replace(/\D/g, '').slice(0, 4);
                break;
        }

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: formattedValue
        }));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        setIsModalOpen(true);

    };

    // Handle modal submission
    const handleModalSubmit = async (event) => {
        // Prevent any potential default behavior
        toggleFormOpen();

        // Close any open error modal and open confirmation modal
        setIsErrorModalOpen(false);
        setIsModalOpen(false); // Ensure previous modal is closed

        // Trigger success modal or confirmation
        setIsSuccessModalOpen(true);
        resetForm();
    };

    // Reset form when error modal closes
    useEffect(() => {
        if (!isErrorModalOpen) {
            setErrors({});
        }
    }, [isErrorModalOpen]);

    // Close modal handler
    const handleClose = () => {
        setIsModalOpen(false);
        setIsErrorModalOpen(false);
        setIsSuccessModalOpen(false);
    };

    return (
        <>
            <GlobalModal />
            <div
                className={`donation-form ${isFormOpen.value ? 'open' : ''}`}
                id="donationForm"
            >
                <button className="close-btn" id="closeBtn" onClick={handleClose}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 0 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000" />
                    </svg>
                </button>
                <form className="payment" onSubmit={(e) => handleSubmit(e, 'pay_single')}>
                    <div>
                        <h1>Ayúdanos a cambiar vidas, <span>tu donación importa.</span></h1>
                    </div>
                    <div>
                        <p>Realiza tu donativo con tu tarjeta de crédito o débito.</p>
                        <img src="/img/tdc.png" alt="tarjetas participantes" />
                    </div>
                    <fieldset>
                        <div className={`input-text ${errors.holder_name ? 'error' : ''}`}>
                            <label htmlFor="cc-name">Nombre:</label>
                            <input
                                type="text"
                                id="cc-name"
                                name="holder_name"
                                value={formValues.holder_name}
                                onInput={handleInputChange}
                                autoComplete="cc-name"
                            />
                            {errors.holder_name && <span className="error-message">{errors.holder_name}</span>}
                        </div>
                        <div className={`input-text ${errors.card_number ? 'error' : ''}`}>
                            <label htmlFor="cc-number">Número de tarjeta:</label>
                            <input
                                type="tel"
                                id="cc-number"
                                name="card_number"
                                value={formValues.card_number}
                                onInput={handleInputChange}
                                autoComplete="cc-number"
                            />
                            {errors.card_number && <span className="error-message">{errors.card_number}</span>}
                        </div>
                        <div className="divider-input">
                            <div className='left'>
                                <div className={`input-group ${errors.expiration_month ? 'error' : ''}`}>
                                    <label htmlFor="cc-exp-month">Mes de vencimiento:</label>
                                    <input
                                        type="text"
                                        name="expiration_month"
                                        id="cc-exp-month"
                                        value={formValues.expiration_month}
                                        onInput={handleInputChange}
                                        autoComplete="cc-exp"
                                        maxLength="2"
                                        placeholder="MM"
                                    />
                                    {errors.expiration_month && <span className="error-message">{errors.expiration_month}</span>}
                                </div>
                                <div className={`input-group ${errors.expiration_year ? 'error' : ''}`}>
                                    <label htmlFor="cc-exp-year">Año de vencimiento:</label>
                                    <input
                                        type="text"
                                        name="expiration_year"
                                        id="cc-exp-year"
                                        value={formValues.expiration_year}
                                        onInput={handleInputChange}
                                        autoComplete="cc-exp"
                                        maxLength="2"
                                        placeholder="YY"
                                    />
                                    {errors.expiration_year && <span className="error-message">{errors.expiration_year}</span>}
                                </div>
                                <div className={`input-group ${errors.cvv2 ? 'error' : ''}`}>
                                    <label htmlFor="cc-csc">CVV:</label>
                                    <input
                                        type="text"
                                        name="cvv2"
                                        id="cc-csc"
                                        value={formValues.cvv2}
                                        onInput={handleInputChange}
                                        autoComplete="cc-csc"
                                        maxLength="4"
                                        placeholder="CVV"
                                    />
                                    {errors.cvv2 && <span className="error-message">{errors.cvv2}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="wrap_buttons_pay">
                            <br />
                            <div className="cantidad">
                                {[500, 300, 100].map((amount) => (
                                    <button
                                        key={amount}
                                        type="button"
                                        value={amount}
                                        onClick={() => {
                                            setFormValues({ ...formValues, amount: amount.toString() });
                                            selectedAmount.value = amount.toString();
                                        }}
                                        className={`amount ${selectedAmount.value === amount.toString() ? 'selected' : ''}`}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                            <div className="angelMsg">
                                <p>Elige donar esta cantidad cada mes y conviértete en un</p>
                                <h3>Ángel de Esperanza</h3>
                            </div>
                            <div className="action_button">
                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e, "pay_single")}
                                    className="flat btnPay"
                                    id="pay_single"
                                >
                                    Solo donar una vez
                                </button>
                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e, "pay_angel")}
                                    className="btnPay"
                                    id="pay_angel"
                                >
                                    Ser un Ángel de Esperanza
                                </button>
                            </div>
                        </div>
                    </fieldset>
                    <div className="flex">
                        <p>Transacciones realizadas vía:</p>
                        <img src="/img/openpay.svg" alt="openpay imagen" width="100px" />
                        <br />
                        <br />
                    </div>
                </form>

                {isModalOpen && (
                    <Modal
                        onClose={handleClose}
                        onSubmit={handleModalSubmit}
                        values={formValues}
                    />
                )}
                {isErrorModalOpen && (
                    <ErrorModal
                        errors={errors}
                        onClose={() => setIsErrorModalOpen(false)}
                    />
                )}
                {isSuccessModalOpen && (
                    <Modal
                        onClose={handleClose}
                        onSubmit={handleModalSubmit}
                        values={formValues}
                        success={true}
                    />
                )}
            </div>
        </>
    );
};

export default DonationForm;