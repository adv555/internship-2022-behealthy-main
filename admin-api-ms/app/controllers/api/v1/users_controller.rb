class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: users, except: [:password, :created_at, :updated_at], status: :ok
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user, except: [:password, :created_at, :updated_at], status: :ok
    else
      render json: { message: "User not found" }, status: :not_found
    end
  end

  def create
    user = User.create(user_params)
    if user.save
      UserMailer.with(user: user).activation_link.deliver_later
      render json: user, except: [:password, :created_at, :updated_at], status: :created
    else
      render json: { error: "Creating failed" }, status: :bad_request
    end
  end

  def update
    user = User.find_by(id: params[:id])
    
    if user
      user.update(user_params)
      render json: user, except: [:password, :created_at, :updated_at], status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request
    end
  end

  def destroy
    user = User.find_by(id: params[:id])

    if user.destroy
      render json: {
        message: "User with the id #{params[:id]} was deleted"
      }, status: :no_content
    else
      render json: { error: "Deleting error" }, status: :bad_request
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :role,
      :isActivated,
      :activationLink,
      :google_id,
      :avatar
    )
  end
end
