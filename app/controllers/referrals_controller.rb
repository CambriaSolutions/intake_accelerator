# frozen_string_literal: true

# Referral Controller handles all service request for
# the creation and modification of referral objects.
class ReferralsController < ApplicationController # :nodoc:
  def create
    @referral = ReferralCreator.create
    render :edit
  end

  def edit
  end

  def update
    @referral = ReferralUpdator.update(params[:referral])
    render :show
  end

  def show
  end
end
