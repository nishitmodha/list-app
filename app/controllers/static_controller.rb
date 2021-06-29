class StaticController < ApplicationController
  def home
    render json: {status: "OKAY"}
  end
end