# frozen_string_literal: true
require 'rails_helper'

feature 'Update Referral' do
  scenario 'via narration text form' do
    faraday_stub = Faraday.new do |builder|
      builder.adapter :test do |stub|
        stub.post('/api/v1/referrals') do |_|
          [201, {}, { 'reference' => 'ABC123', 'id' => 1 }]
        end

       stub.put('/api/v1/referrals/1', "referral": { "narration_text": 'test 123', "id": '1' }) do |_|
          [200, {}, { 'narration_text' => 'test 123' }]
        end
      end
    end

    allow(API).to receive(:connection).and_return(faraday_stub)
    visit root_path

    click_link 'Create Referral'

    expect(page.text).to match(/Referral #ABC123/)

    find('#referral_narration_text').set('test 123')
    
    click_button('Save')

    expect(page.text).to match(/test 123/)
  end
end
