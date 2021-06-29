class ListsController < ApplicationController
  include CurrentUserConcern
  before_action :set_list, only: [:show, :destroy, :update]
  
  def index
    lists = List.where("user_id = ?", params[:user_id])
    if lists.length > 0
      render json: lists
    else
      render json: {
        message: 'No lists found',
        status: 404,
        type: 'Error'
      }
    end
  end

  def show
    render json: @list
  end

  def create
    @list = List.create(title: params[:title], user_id: params[:user_id])
    if @list.save
      render json: @list
    else
      render json: {
        message: "List creation failed",
        type: "error",
        status: 422
      }
    end
    
  end

  def update
    if @list.update(list_params)
      render json: @list, status: 200
    else
      render json: { error: @list.errors }, status: 422
    end
  end

  def destroy
    @list.destroy
    head 204
  end

  private

  def set_list
    @list = List.find(params[:id])
  end

  def list_params
    params.permit(:id, :title, :user_id)
  end
end
