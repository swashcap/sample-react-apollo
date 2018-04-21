import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './ExchangeRates.css';

/**
 * @param {number} rate
 * @returns {string}
 */
const displayRate = (rate) => {
  const rounded = (Math.round(rate * 100) / 100).toString();
  const [,decimal] = rounded.split('.');

  if (rounded === '0') {
    return '< 0.01';
  } else if (!decimal) {
    return `${rounded}.00`;
  } else if (decimal.length === 1) {
    return `${rounded}0`;
  }

  return rounded;
};

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      let content;

      if (loading) {
        content = 'Loading…';
      } else if (error) {
        console.error(error);
        content = `Error: ${error.message}`;
      } else {
        content = (
          <table>
            <tbody>
              {data.rates.map(({ currency, rate }) => (
                <tr key={currency}>
                  <th scope='row'>{currency}</th>
                  <td>{displayRate(rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }

      return (
        <aside className='ExchangeRates'>
          <h2 className='ExchangeRates-heading'>
            <abbr title='United States Dollar'>USD</abbr>
            {' '}
            Exchange Rates
          </h2>
          <div className='ExchangeRates-content'>
            {content}
          </div>
        </aside>
      );
    }}
  </Query>
)

export default ExchangeRates;
