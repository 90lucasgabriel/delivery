<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\ProductTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ProductPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class ProductPresenter extends FractalPresenter
{

    public function getTransformer()
    {
        return new ProductTransformer();
    }
}
