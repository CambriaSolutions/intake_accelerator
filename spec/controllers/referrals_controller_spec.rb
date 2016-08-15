# frozen_string_literal: true
require 'rails_helper'

describe ReferralsController do
  describe '#create' do
    it 'Creates a new referral' do
      allow(ReferralCreator).to receive(:create).and_return(double(:referral))
      post :create
      assert_response :success
    end
  end

  describe '#update' do
    it 'Update referral narration text' do
      allow(ReferralUpdator).to receive(:update).and_return(double(:referral))
      put :update, 'id': '1', 'narration_text': 'test 123'
      assert_response :success
    end
  end
end
