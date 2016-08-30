<?php
namespace CodeDelivery\Http\Requests;

use Illuminate\Http\Request as HttpRequest;

class CheckoutRequest extends Request
{
	public function authorize()
	{
		return true;
	}

	public function rules(HttpRequest $request)
	{
		$rules = [
			"coupon_code" => "exists:coupons,code,used,0",
		];

		$this->buildRulesItems(0, $rules);
		$items = $request->get("items", []);
		$items = !is_array($items)?[]:$items;
		foreach($items as $key=>$val){
			$this->buildRulesItems($key, $rules);
		}

		return $rules;
	}

	public function buildRulesItems($key, array &$rules){
		$rules["items.$key.product_id"] = "required";
		$rules["items.$key.quantity"] = "required";
	}
}
