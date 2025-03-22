import { useState } from 'preact/hooks';

const Modal = ({ onClose, onSubmit, values, success = false }) => {
    const [formValues, setFormValues] = useState({
        line1: '',
        line2: '',
        postal_code: '',
        city: '',
        state: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // If it's a success modal, just close it
        if (success) {
            onClose();
            return;
        }

        const completeData = {
            ...values,
            address: {
                line1: formValues.line1,
                line2: formValues.line2,
                postal_code: formValues.postal_code,
                city: formValues.city,
                line3: formValues.city.replace(/[^a-zA-Z0-9\s]/g, ''), //TODO:check this feature fix remove accents
                state: formValues.state,
                country_code: 'MX',
            },
            email: formValues.email
        };
        onSubmit(completeData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <img src="./LogoGanac.png" alt="logo ganac" />
                {!success ? (
                    <>
                        <h2>Donarás <span>${values.amount}</span>? con tu tarjeta terminación <span>{values.card_number.slice(-4)}</span></h2>
                        <p>Por seguridad necesitamos algunos datos adicionales.</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="address-line1">Calle y número:</label>
                            <input
                                type="text"
                                id="address-line1"
                                name="line1"
                                autoComplete="address-line1"
                                value={formValues.line1}
                                onInput={handleChange}
                                placeholder="Av. alegría #23"
                            />
                            <label htmlFor="address-line2">Colonia y municipio:</label>
                            <input
                                type="text"
                                id="address-line2"
                                name="line2"
                                autoComplete="address-line2"
                                value={formValues.line2}
                                onInput={handleChange}
                                placeholder=""
                            />
                            <div className='city-fields'>
                                <div className='field-group'>
                                    <label htmlFor="postal-code">Código Postal:</label>
                                    <input
                                        type="text"
                                        id="postal-code"
                                        name="postal_code"
                                        autoComplete="postal-code"
                                        value={formValues.postal_code}
                                        onInput={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div className='field-group'>
                                    <label htmlFor="city">Ciudad:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        autoComplete="address-level2"
                                        value={formValues.city}
                                        onInput={handleChange}
                                        placeholder=""
                                    />
                                </div>
                                <div className='field-group'>
                                    <label htmlFor="state">Estado:</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        autoComplete="address-level1"
                                        value={formValues.state}
                                        onInput={handleChange}
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={formValues.email}
                                onInput={handleChange}
                                placeholder=""
                            />
                            <div className="modal-buttons">
                                <button type="submit">Siguiente</button>
                                <button type="button" onClick={onClose}>
                                    Mejor no donar
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>¡Donación Exitosa!</h2>
                        <p>Gracias por tu donación de <span>${values.amount}</span></p>
                        <button onClick={onClose}>Cerrar</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;