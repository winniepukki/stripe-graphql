import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedStripeCheckoutForm from '../InjectedStripeCheckoutForm';
import Loader from 'Component/Loader';
import './Stripe.style';

export class Stripe extends ExtensiblePureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        stripeKey: PropTypes.string,
        setStripeRef: PropTypes.func.isRequired,
        billingAddress: PropTypes.shape({
            city: PropTypes.string,
            company: PropTypes.string,
            country_id: PropTypes.string,
            email: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            postcode: PropTypes.string,
            region_id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            region: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.string
            ]),
            street: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.array
            ]),
            telephone: PropTypes.string
        }).isRequired
    };

    static defaultProps = {
        stripeKey: '',
        isLoading: false
    };

    renderNoStripeKey() {
        return (
            <p>{ __('Error loading Stripe! No API-key specified.') }</p>
        );
    }

    renderStripeForm() {
        const {
            setStripeRef,
            stripeKey,
            billingAddress,
            paymentTotals
        } = this.props;

        return (
            <StripeProvider apiKey={ stripeKey }>
                <Elements>
                    <InjectedStripeCheckoutForm
                      onRef={ setStripeRef }
                      billingAddress={ billingAddress }
                      paymentTotals={ paymentTotals }
                    />
                </Elements>
            </StripeProvider>
        );
    }

    renderContent() {
        const {
            stripeKey,
            isLoading
        } = this.props;

        if (isLoading) {
            return <Loader isLoading />;
        }

        if (!stripeKey) {
            return this.renderNoStripeKey();
        }

        return this.renderStripeForm();
    }

    render() {
        return (
            <div block="Stripe">
                { this.renderContent() }
            </div>
        );
    }
}

export default middleware(Stripe, 'Component/Stripe/Component');
