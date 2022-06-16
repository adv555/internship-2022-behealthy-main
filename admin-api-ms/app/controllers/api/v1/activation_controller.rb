class Api::V1::ActivationController < ApplicationController
  def show
    user = User.find_by(activationLink: params[:id])

    if user && !user.isActivated
      user.update(
        isActivated: true
      )
      render json: { message: "User with the id #{user.id} was activated" }
    else
      render json: { message: "User not found or already activated" }, status: :not_found
    end
  end
end
