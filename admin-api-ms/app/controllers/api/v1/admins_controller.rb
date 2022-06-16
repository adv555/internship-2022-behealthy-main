class Api::V1::AdminsController < ApplicationController
  def index
    admins = Admin.all
    render json: admins, except: %i[password_digest password]
  end

  def registration
    admin = Admin.create(admin_params)
    if admin.save
      tokens = init_tokens(admin.id, admin.email)
      render json: tokens, except: %i[password created_at updated_at], status: :ok
    else
      render json: { error: "Creating failed" }, status: :bad_request
    end
  end

  def login
    admin = Admin.find_by(email: params[:email])
    if admin && admin.authenticate(params[:password])
      render json: init_tokens(admin.id, admin.email)
    else
      render json: { error: "Invalid username or password" }
    end
  end

  def show
    admin = Admin.find_by(id: params[:id])
    if admin
      render json: admin, except: %i[password password_digest created_at updated_at], status: :ok
    else
      render json: { message: "Admin data not found" }, status: :not_found
    end
  end

  def update
    admin = Admin.find_by(id: params[:id])
    
    if admin
      admin.update(admin_params)
      render json: admin, except: %i[password password_digest created_at updated_at], status: :ok
    else
      render json: { error: "Updating error" }, status: :bad_request
    end
  end

  def destroy
    admin = Admin.find_by(id: params[:id])

    if admin.destroy
      render json: {
        message: "Admin with the id #{params[:id]} was deleted"
      }
    else
      render json: { error: "Deleting error" }, status: :bad_request
    end
  end

  def init_tokens(id, email)
    tokens = get_tokens({
      sup: id,
      username: email
    })

    return tokens
  end

  private
  def admin_params
    params.require(:admin).permit(
      :email,
      :password
    )
  end
end
