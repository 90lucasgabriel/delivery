<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\UserTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class UserPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class UserPresenter extends FractalPresenter
{

    public function getTransformer()
    {
        return new UserTransformer();
    }
}
