# frozen_string_literal: true
require 'rails_helper'

describe ReferralUpdator do
  describe '.update' do
    it 'returns the report if the put to /referrals/:id is successful' do
      mock_response = double(:mock_response, status: 200, body: double)
      allow(API.connection).to receive(:put).and_return(mock_response)
      referral = ReferralUpdator.update('id': 1, 'narration_text': 'test 123')
      expect(referral).to eq(mock_response.body)
    end

    it 'raise an error if the response code is not 200' do
      mock_response = double(:mock_response, status: 500)
      allow(API.connection).to receive(:put).and_return(mock_response)

      expect do
        ReferralUpdator.update('id': 1, 'narration_text': 'test 123')
      end.to raise_error RuntimeError
    end
  end
end
