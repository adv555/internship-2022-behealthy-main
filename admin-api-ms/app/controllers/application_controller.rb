class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  after_action :apply_content_range_header
  
  def autorized
    auth_header = request.headers["Authorization"]
    token = auth_header.split(' ')[1]

    decoded_data = decode_token(token, "JWT_ACCESS_SECRET")

    admin_id = decoded_data[0]["sup"] if decoded_data

    admin = Admin.find_by(id: admin_id)

    if admin
      return true
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def generate_token(payload, exp, secret)
    expiration_time = Time.now.to_i + 10 * 60
    payload_with_exp = {
      sup: payload[:sup],
      username: payload[:username],
      exp: exp
    }

    JWT.encode(payload_with_exp, secret)
  end

  def get_tokens(payload)
    access_exp_time = Time.now.to_i + 600
    refresh_exp_time = Time.now.to_i + 604800

    access_token = generate_token(payload, access_exp_time, "JWT_ACCESS_SECRET")
    refresh_token = generate_token(payload, refresh_exp_time, "JWT_REFRESH_SECRET")

    redis = Redis.new
    redis.set(payload[:sup], refresh_token)
    
    return {
      accessToken: access_token,
      refreshToken: refresh_token
    }
  end

  def decode_token(token, secret)
    begin
      JWT.decode(token, secret, true, algorithm: 'HS256')
    rescue
      nil
    end
  end
  

  protected
  def apply_content_range_header
    response.headers['Content-Range'] = 'orders 0-24/319'
  end
end
